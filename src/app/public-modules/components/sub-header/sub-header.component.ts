import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService, SharedService, SnackBarService } from '@app/core';
import { LeagueService } from '@app/core/services/league.service';
import { UserModel } from '@app/helpers/models';
import { SharedCommonService } from '@app/helpers/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  @Output() leagueSelected = new EventEmitter<any>();

  leagueID!: string;
  clubID!: string;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  selectedLeague: any;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private snackbarService: SnackBarService,
    private SharedCommonService: SharedCommonService,
    private leagueService: LeagueService
  ) {}

  ngOnInit(): void {
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
    this.leagueService.setSelectedLeague(league);
  }
  
  get isLoggedIn() {
    return this.sharedService.isLoggedIn();
  }

}
