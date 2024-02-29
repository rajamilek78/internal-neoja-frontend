import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder,FormGroup,FormArray,Validators} from '@angular/forms';
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
  isDropInDisabled = true;
  isNoShowDisabled = false;

  leagueSummaryData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private commonservice: CommonService,
    private SharedCommonService: SharedCommonService
  ) {
    this.playerForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit() {
    // this.addPlayers(this.playerCount);
    this.userSubscriber();
    this.leagueSummary();
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
    //const playersArray = this.playerForm.get('players') as FormArray;
    //playersArray.clear();
    //const ownedCompanies = this.userDetail?.owned_companies;
    // const ownedClubs = this.userDetail?.owned_clubs;
    // const name = this.leagueID;
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;
    // const compnyclubnameStr = `${ownedClubs}/${name}`;
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

            const playerGroup = this.fb.group({
              name: [
                { value: playerName, disabled: true },
                Validators.required,
              ],
              score: [{ value: playerData.points_scored, disabled: true }, Validators.required],
              dropIn: [playerData['drop-in']],
              noShow: [playerData['no-show']],
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
  // isNameDisabled(player: AbstractControl): boolean {
  //   if (player instanceof FormGroup) {
  //     return player.controls['name'].value !== '';
  //   }
  //   return false;
  // }
  // isNameDisabled(playerName: string): boolean {
  //   return playerName !== '';
  // }
  // updateToggleState() {
  //   this.isDropInDisabled = true;
  //   this.isNoShowDisabled = !this.isDropInDisabled;
  //   this.players.controls.forEach((control) => {
  //     control.get('dropIn')?.setValue('', { emitEvent: false });
  //     control.get('noShow')?.setValue('', { emitEvent: false });
  //     control.get('dropIn')?.disable({ emitEvent: false });
  //     control.get('noShow')?.enable({ emitEvent: false });
  //   });
  // }

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
    //const ownedCompanies = this.userDetail?.owned_companies;
    // const ownedClubs = this.userDetail?.owned_clubs;
    // const name = this.leagueID;
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;
    const playerData = {
      day: 4,
      date: "02/05/2024",
      players: {}
    };
    this.playerForm.getRawValue().players.forEach(player => {
      playerData.players[player.name] = player.score;
    });
  
    // const playerData = this.playerForm.getRawValue().players.reduce((obj, player) => {
    //   obj[player.name] = player.score;
    //   return obj;
    // }, {});
    this.commonservice.uploadData(clubLeagueStr, playerData).subscribe({
      next: (res: any) => {
        this.SharedCommonService.setMatchData(res);
        // localStorage.setItem('matchData', JSON.stringify(res));
        this.router.navigate([RouteConstant.LEAGUE_CONTAINER,{selectedLeague: this.leagueID}]);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
