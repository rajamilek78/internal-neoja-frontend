import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder,FormGroup,FormArray,Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService, SharedService } from '@app/core';
import { Router } from '@angular/router';
import { SharedCommonService } from '@app/helpers/services';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
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
  clubID!:string;
  @Input() playerCount!: number;
  @Input() roundsLength!: number;
  @Input() leagueID!: string;
  @Input() selectedDay!: string;
  @Input() selectedDate!: string;
  isDropInDisabled = true;
  isNoShowDisabled = false;

  leagueSummaryData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private commonservice: CommonService,
    private datePipe : DatePipe,
    private SharedCommonService: SharedCommonService
  ) {
    this.playerForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit() {
    // this.addPlayers(this.playerCount);
    this.userSubscriber();
    if(this.roundsLength >= 1){
    this.leagueSummary();
  }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
    if (changes['playerCount']) {
      this.onPlayerCountChange(this.playerCount);
      console.log(this.playerCount);
    }
  }

  ngOnDestroy() {
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

  deletePlayer(index: number): void {
    this.players.removeAt(index);
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
        if(this.userDetail){
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
        for (const playerName in this.leagueSummaryData.league_summary) {
          if (
            this.leagueSummaryData.league_summary.hasOwnProperty(playerName)
          ) {
            const playerData =
              this.leagueSummaryData.league_summary[playerName];
              const winLoseHistory = playerData.win_lose_history ? playerData.win_lose_history.split(',').reverse() : [];

            const playerGroup = this.fb.group({
              name: [
                { value: playerName, disabled: true },
                Validators.required,
              ],
              score: [{ value: playerData.rating, disabled: true }, Validators.required],
              winLoseHistory: [{ value: winLoseHistory, disabled: true }]
              
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
        for (let i = currentCount; i > count; i--) {
          this.deletePlayer(i - 1);
        }
      }
    }
  }
  submitData(): void {
    const formattedDate = this.datePipe.transform(this.selectedDate, 'MM/dd/yyyy');
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;
  
    if (this.roundsLength >= 1) {
      const playerDataRound2 = {
        day: this.selectedDay,
        date: formattedDate,
        players: {}
      };
  
      // Loop through players in the form
      this.playerForm.getRawValue().players.forEach(player => {
        playerDataRound2.players[player.name] = {
          rating: player.score,
          in_round1: player.in_round1,
          is_deleted: player.isDeleted || false // Mark the player as deleted if needed
        };
      });
  
      // Upload data for round 2
      this.commonservice.uploadDataRound2(clubLeagueStr, playerDataRound2).subscribe({
        next: (res: any) => {
          this.SharedCommonService.setMatchData(res);
          this.router.navigate([RouteConstant.LEAGUE_CONTAINER, { selectedLeague: this.leagueID }]);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      const playerData = {
        day: 4,
        date: "02/05/2024",
        players: {}
      };
  
      // Loop through players in the form
      this.playerForm.getRawValue().players.forEach(player => {
        playerData.players[player.name] = player.score;
      });
  
      // Upload data for round 1
      this.commonservice.uploadData(clubLeagueStr, playerData).subscribe({
        next: (res: any) => {
          this.SharedCommonService.setMatchData(res);
          this.router.navigate([RouteConstant.LEAGUE_CONTAINER, { selectedLeague: this.leagueID }]);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  
}
