import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonService, SharedService } from '@app/core';
import { SnackBarService } from '@app/core/services/snackbar.service';
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
  clubID!: string;
  selectedFormat = '1';
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  selectedLeague: any;
  selectedDate!: Date;
  roundCount!: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private sharedService: SharedService,
    private snackbarService: SnackBarService,
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
        if (this.userDetail) {
          this.clubID = this.userDetail?.club_id;
        }
      });
  };

  getAllLeagues() {
    const urlString = `${this.clubID}`;
    this.commonService.getAllLeagues(urlString).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map((id) => ({ id, ...res[id] }));
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }

  onLeagueSelect(league: any) {
    this.selectedLeague = league;
    this.leagueID = league.id;
    if (league) {
      localStorage.setItem('leagueID', this.selectedLeague.id);
      localStorage.setItem('leagueName', this.selectedLeague.name);
    }
    const clubLeagueStr = `${this.clubID}/${this.leagueID}/all`;
    this.commonService.getRounds(clubLeagueStr).subscribe({
      next: (res: any) => {
        this.roundsLength = res ? Object.keys(res).length : 0;
        this.roundCount = this.roundsLength + 1;
        this.selectedFormat = this.roundsLength >= 1 ? '2' : '1';
        this.SharedCommonService.setLeagueID(this.leagueID);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
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
