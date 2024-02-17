import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  @Input() playerCount!: number;
  @Input() roundsLength!: number;
  leagueSummaryData: any;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private commonservice: CommonService ,
    private SharedCommonService: SharedCommonService
 ) {
    this.playerForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addPlayers(this.playerCount);
    this.userSubscriber();
    this.leagueSummary();
  }

  createPlayer(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      score: ['', Validators.required],
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

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['playerCount']) {
  //     this.onPlayerCountChange(this.playerCount);
  //   }
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
    if (changes['playerCount']) {
      this.onPlayerCountChange(this.playerCount);
      console.log(this.playerCount);
      
    }
  }
  

  // onPlayerCountChange(count: number): void {
  //   const currentCount = this.players.length;
  //   if (count > currentCount) {
  //     this.addPlayers(count - currentCount);
  //   } else {
  //     for (let i = currentCount; i > count; i--) {
  //       this.deletePlayer(i - 1);
  //     }
  //   }
  // }
  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        console.log(this.userDetail);
      });
  };


  leagueSummary() {
    const ownedCompanies = this.userDetail?.owned_companies;
    const ownedClubs = this.userDetail?.owned_clubs;
    const name = 'FRIENDS-3.0-4.0-SAT12PM-WINTER1';
    const compnyclubnameStr = `${ownedCompanies}/${ownedClubs}/${name}`;
    
    this.commonservice.getLeaguesSummary(compnyclubnameStr).subscribe({
      next: (res: any) => {
        console.log(res);
        this.leagueSummaryData = res;
      },
      error: (err: any) => {
        console.error(err);
      }
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
    const playerData = this.playerForm.value.players.reduce((obj, player) => {
      obj[player.name] = player.score;
      return obj;
    }, {});

    this.commonservice.post('json', playerData).subscribe({
      next: (res: any) => {
        this.SharedCommonService.setMatchData(res);
        // localStorage.setItem('matchData', JSON.stringify(res));
        this.router.navigate([RouteConstant.LEAGUE_CONTAINER]);
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
