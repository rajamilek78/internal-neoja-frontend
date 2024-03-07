import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonService, SharedService } from '@app/core';
import { UserModel } from '@app/helpers/models';
import { SharedCommonService } from '@app/helpers/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-player-container',
  templateUrl: './upload-player-container.component.html',
  styleUrl: './upload-player-container.component.scss',
})
export class UploadPlayerContainerComponent implements OnInit {
  // roundCount = 5;
  roundsLength!: number;
  leagueID!: string;
  clubID!: string
  selectedFormat = '1';
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  selectedLeague!: string;
  selectedDate! : Date;
  roundCount!:number;

  constructor(
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private sharedService: SharedService,
    private SharedCommonService: SharedCommonService
  ) {}

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.userSubscriber();
    this.getAllLeagues();    
  }
  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if(this.userDetail){
          this.clubID = this.userDetail?.club_id;
        }
      });
  };

  getAllLeagues() {
    // const ownedCompanies = this.userDetail?.owned_companies;
    // const clubID = this.userDetail?.club_id;
    const urlString = `${this.clubID}/all`
    // const compnyclubStr = `${ownedClubs}/all`;
    this.commonService.getAllLeagues(urlString).subscribe({
      next: (res: any) => {
        console.log(res);
        this.leagues = Object.keys(res).map((key) => ({
          name: key,
          description: res[key].description,
        }));
      },
      error: (err: any) => {},
    });
  }

  onLeagueSelect(leagueName: string) {
    this.leagueID = leagueName;
    localStorage.setItem('leagueID',this.leagueID)

    const clubLeagueStr = `${this.clubID}/${this.leagueID}/all`;
    this.commonService.getRounds(clubLeagueStr).subscribe({
      next: (res: any) => {
        this.roundsLength = res ? Object.keys(res).length : 0;
        this.roundCount = this.roundsLength + 1;
        // if (res) {
        //   this.roundsLength = Object.keys(res).length as number;
        // } else {
        //   this.roundsLength = 0; // Set roundsLength to null if the response is null
        // }
        this.selectedFormat = this.roundsLength >= 1 ? '2' : '1';
        this.SharedCommonService.setLeagueID(this.leagueID);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  get isDisableUploadByFile(): boolean {
    return this.roundsLength >= 1;
  }

  onRadioButtonChange() {
    this.cdr.detectChanges();
  }
}
