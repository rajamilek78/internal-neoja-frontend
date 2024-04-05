import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService, SharedService, SnackBarService } from '@app/core';
import { LeaguemanageService } from '@app/core/services/league.service';
import { UserModel } from '@app/helpers/models';
import { SharedCommonService } from '@app/helpers/services';
import { LeagueService } from '@app/private-modules/modules/create-league-module/services/league.service';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent implements OnInit{
  @Output() leagueSelected = new EventEmitter<any>();

  leagueID!: string;
  clubID!: string;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  selectedLeague: any;
  selectedLeagueName:any
  selectedLeagueSub$! : Subscription;
  private leagueSub!: Subscription;
  private debounceSubject = new Subject<any>();

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private snackbarService: SnackBarService,
    private SharedCommonService: SharedCommonService,
    private leagueService: LeaguemanageService,
    private LeagueServiceEmit : LeagueService,
    private router: Router
  ) {
    this.debounceSubject.pipe(debounceTime(300)).subscribe(this.onLeagueSelect);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Call getAllLeagues() when navigation ends (route changes)
        // this.getAllLeagues();
      }
    });
  }
  
  ngOnInit(): void {
  this.selectedLeagueSub$ = this.selectedLeague = this.leagueService.getSelectedLeague();
    this.userSubscriber();
      this.getAllLeagues();
      this.leagueSub = this.LeagueServiceEmit.leagueChanged.subscribe(() => {
        this.getAllLeagues();
      });
    }

  
  
  ngOnDestroy() {
    
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();      
    }
    if(this.selectedLeagueSub$){
      this.selectedLeagueSub$.unsubscribe();
    }
    if(this.leagueSub){
      this.leagueSub.unsubscribe();
    }
    //this.router.events.subscribe();
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

  // getAllLeagues() {
  //   const urlString = `${this.clubID}`;
  //   this.commonService.getAllLeagues(urlString).subscribe({
  //     next: (res: any) => {
  //       this.leagues = Object.keys(res).map((id) => ({ id, ...res[id] }));
  //     },
  //     error: (err: any) => {
  //       const message = err.error.message;
  //       this.snackbarService.setSnackBarMessage(message);
  //     },
  //   });
  // }
  getAllLeagues() {
    const urlString = `${this.clubID}`;
    this.commonService.getAllLeagues(urlString).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map((id) => ({ id, ...res[id] }));
        if (this.selectedLeague) {
          const selectedLeagueIndex = this.leagues.findIndex(league => league.id === this.selectedLeague.id);
          if (selectedLeagueIndex !== -1) {
            this.selectedLeague = this.leagues[selectedLeagueIndex];
            this.selectedLeagueName = this.leagues[selectedLeagueIndex].name;
          } 
          // else {
          //   this.selectedLeague = this.leagues[0];
          //   this.selectedLeagueName = this.leagues[0].name;
          // }
        } 
        // else {
        //   this.selectedLeague = this.leagues[0];
        //   this.selectedLeagueName = this.leagues[0].name;
        // }
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  

  onLeagueSelect(league: any) {
    this.leagueService.setSelectedLeague(league);
    console.log(this.selectedLeague)
  }
  
  triggerDebounce(league: any) {
    this.debounceSubject.next(league);
  }

  isLeagueDropdownDisabled(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/manage-leagues') || currentRoute.includes('/fixtures');
  }
  isSubHeaderVisible(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/manage-leagues');
  }

}
