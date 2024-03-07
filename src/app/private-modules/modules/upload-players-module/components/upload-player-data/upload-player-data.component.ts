import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService, SharedService } from '@app/core';
import { Router } from '@angular/router';
import { SharedCommonService } from '@app/helpers/services';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDetailDialogueComponent } from '../delete-detail-dialogue/delete-detail-dialogue.component';
@Component({
  selector: 'app-upload-player-data',
  templateUrl: './upload-player-data.component.html',
  styleUrl: './upload-player-data.component.scss',
})
export class UploadPlayerDataComponent implements OnInit {
  playerForm!: FormGroup;
  isRoundTwo = false;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  clubID!: string;
  @Input() roundCount!: number;
  @Input() roundsLength!: number;
  @Input() leagueID!: string;
  @Input() selectedLeague: any;
  // @Input() selectedDay!: number;
  @Input() selectedDate!: Date;
  isDropInDisabled = true;
  isNoShowDisabled = false;
  //@Input() leagueID!: string;
  leagueIDSubscription!: Subscription;

  leagueSummaryData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private commonservice: CommonService,
    private datePipe: DatePipe,
    private SharedCommonService: SharedCommonService,
    private dialog: MatDialog
  ) {
    this.playerForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit() {
    // this.addPlayers(this.playerCount);
    this.userSubscriber();
    if (this.roundsLength >= 1) {
      this.leagueSummary();
    }else{
      this.addPlayer();
    }
    this.leagueIDSubscription =
      this.SharedCommonService.leagueChanged.subscribe(
        (newLeagueID: string) => {
          if (this.roundsLength >= 1) {
            this.leagueSummary();
          }
        }
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
    if (changes['playerCount']) {
      this.onPlayerCountChange(this.roundCount);
      console.log(this.roundCount);
    }
  }

  ngOnDestroy() {
    this.leagueIDSubscription.unsubscribe();
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  createPlayer(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      score: ['', Validators.required],
      // dropIn: [{ value: '', disabled: this.isDropInDisabled }],
      // noShow: [{ value: '', disabled: this.isNoShowDisabled }],
    });
  }

  addPlayer(): void {
    this.players.push(this.createPlayer());
  }

  

  addPlayers(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addPlayer();
    }
  }

  get players(): FormArray {
    return this.playerForm.get('players') as FormArray;
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          this.clubID = this.userDetail?.club_id;
        }
        console.log(this.userDetail);
      });
  };
  leagueSummary() {
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;
    this.commonservice.getLeaguesSummary(clubLeagueStr).subscribe({
      next: (res: any) => {
        console.log(res);
        this.leagueSummaryData = res;
        const playersArray = this.playerForm.get('players') as FormArray;
        playersArray.clear();
        for (const playerName in this.leagueSummaryData.players) {
          if (
            this.leagueSummaryData.players.hasOwnProperty(playerName)
          ) {
            const playerData =
              this.leagueSummaryData.players[playerName];
            const winLoseHistory = playerData.win_lose_history
              ? playerData.win_lose_history.split(',').reverse()
              : [];
            const round = playerData.in_round1;
            const playerGroup = this.fb.group({
              name: [
                { value: playerName, disabled: true },
                Validators.required,
              ],
              score: [
                { value: playerData.weighted_rating, disabled: true },
                Validators.required,
              ],
              winLoseHistory: [{ value: winLoseHistory, disabled: true }],
              round: [{ value: round, disabled: true }],
            });

            playersArray.push(playerGroup);
          }
        }
        // this.updateToggleState();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onPlayerCountChange(count: number): void {
    if (this.players) {
      const currentCount = this.players.length;
      if (count > currentCount) {
        this.addPlayers(count - currentCount);
      } else {
        // for (let i = currentCount; i > count; i--) {
        //   this.deletePlayer(i - 1);
        // }
      }
    }
  }
  submitData(): void {
    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'MM/dd/yyyy'
    );
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;

    if (this.roundsLength >= 1) {
      const playerDataRound2 = {
        round: this.roundCount,
        date: formattedDate,
        players: {},
      };

      // Loop through players in the form
      this.playerForm.getRawValue().players.forEach((player) => {
        playerDataRound2.players[player.name] = {
          rating: player.score,
          in_round1: player.in_round1,
          is_deleted: player.isDeleted || false, // Mark the player as deleted if needed
        };
      });

      // Upload data for round 2
      this.commonservice
        .uploadDataRound2(clubLeagueStr, playerDataRound2)
        .subscribe({
          next: (res: any) => {
            this.SharedCommonService.setMatchData(res);
            this.router.navigate([
              RouteConstant.LEAGUE_CONTAINER,
              { 
                leagueID: this.leagueID,
                selectedLeague : this.selectedLeague
              },
            ]);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    } else {
      const playerData = {
        round: String(this.roundCount),
        date: formattedDate,
        players: {},
      };

      // Loop through players in the form
      this.playerForm.getRawValue().players.forEach((player) => {
        playerData.players[player.name] = player.score;
      });

      // Upload data for round 1
      this.commonservice.uploadData(clubLeagueStr, playerData).subscribe({
        next: (res: any) => {
          this.SharedCommonService.setMatchData(res);
          this.router.navigate([
            RouteConstant.LEAGUE_CONTAINER,
            { leagueID: this.leagueID },
          ]);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  deletePlayer(index:number): void {
    //this.players.removeAt(index);
    this.openDialogue(index);
  }

  openDialogue(index:number): void {
    const player = this.players.at(index).value; // Get the player at the given index
    const dialogueRef = this.dialog.open(DeleteDetailDialogueComponent, {
      width: '450px',
      data : {
        roundCount : this.roundCount,
        playerName : player.name,
        players : this.players,
        index : index
      }
    });
    dialogueRef.afterClosed().subscribe((result) => {
      console.log('the dialogue is closed now');
    });
  }
}
