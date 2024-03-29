import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { DeleteDetailDialogueComponent } from '../delete-detail-dialogue/delete-detail-dialogue.component';
import { SnackBarService,SharedCommonService,CommonService,SharedService } from '@app/core';
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
  @Input() selectedDate!: Date;
  isDropInDisabled = true;
  isNoShowDisabled = false;
  roundOnePlayersCount!: number;
  dropInPlayersCount!: number;
  leagueIDSubscription!: Subscription;
  sortedBy: string = ''; // Track the currently sorted field
  isAscending: boolean = true; // Track the sorting order

  leagueSummaryData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private commonservice: CommonService,
    private snackbarService: SnackBarService,
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
    } else {
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
      score: ['', Validators.required]
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

  sortPlayers(field: 'name' | 'score'): void {
    const playersArray = this.playerForm.get('players') as FormArray;
    let sortedPlayers = playersArray.controls.slice();

    // Toggle sorting order or reset sorting
    if (this.sortedBy === field) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedBy = field;
      this.isAscending = true;
    }

    // Perform sorting based on the selected field and order
    sortedPlayers.sort((a, b) => {
      const valueA = a.value[field];
      const valueB = b.value[field];
      if (field === 'name') {
        if (this.isAscending) {
          return valueA.localeCompare(valueB); // Compare strings for name field
        } else {
          return valueB.localeCompare(valueA); // Compare strings for name field in reverse order
        }
      } else if (field === 'score') {
        if (this.isAscending) {
          return valueA - valueB; // Compare numbers directly for score field in ascending order
        } else {
          return valueB - valueA; // Compare numbers directly for score field in descending order
        }
      }
      return 0; // Default return
    });

    // Update the form array with sorted players
    playersArray.clear();
    sortedPlayers.forEach((player) => {
      playersArray.push(player);
    });
    //  // Check if the same field is clicked thrice to reset sorting
    //  if (this.sortedBy === field && !this.isAscending) {
    //   this.sortedBy = ''; // Reset sortedBy field
    //   this.isAscending = true; // Reset sorting order to ascending
    // }
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
      });
  };
  leagueSummary() {
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;
    this.commonservice.getLeaguesSummary(clubLeagueStr).subscribe({
        next: (res: any) => {
            this.roundOnePlayersCount = res.round1_player_count;
            this.dropInPlayersCount = res.drop_in_player_count;
            this.leagueSummaryData = res;
            let sortedPlayers = Object.entries(this.leagueSummaryData.players);
            // sortedPlayers.sort((a, b) => {
            //     return (b[1] as any)['weighted_rating'] - (a[1] as any)['weighted_rating'];
            // });
            const playersArray = this.playerForm.get('players') as FormArray;
            playersArray.clear();
            for (let i = 0; i < sortedPlayers.length; i++) {
                let playerName = sortedPlayers[i][0];
                let playerData = sortedPlayers[i][1] as any;
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
            // this.updateToggleState();
        },
        error: (err: any) => {
          this.roundOnePlayersCount = 0;
            this.dropInPlayersCount = 0;
            const playersArray = this.playerForm.get('players') as FormArray;
            playersArray.clear();
            this.addPlayer()
            const message = err.error.message;
            this.snackbarService.setSnackBarMessage(message);
        },
    });
}


  onPlayerCountChange(count: number): void {
    if (this.players) {
      const currentCount = this.players.length;
      if (count > currentCount) {
        this.addPlayers(count - currentCount);
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
              { leagueID: this.leagueID, leagueName: this.selectedLeague.name },
            ]);
          },
          error: (err: any) => {
            const message = err.error.message;
            this.snackbarService.setSnackBarMessage(message);
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
            { leagueID: this.leagueID, leagueName: this.selectedLeague.name },
          ]);
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
        },
      });
    }
  }
  deletePlayer(index: number): void {
    this.openDialogue(index);
  }

  openDialogue(index: number): void {
    const player = this.players.at(index).value; // Get the player at the given index
    const dialogueRef = this.dialog.open(DeleteDetailDialogueComponent, {
      width: '450px',
      data: {
        roundCount: this.roundCount,
        playerName: player.name,
        players: this.players,
        index: index,
      },
    });
    dialogueRef.afterClosed().subscribe((result) => {
    });
  }
}
