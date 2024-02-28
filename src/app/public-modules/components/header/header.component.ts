import { Component, OnDestroy, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RouteConstant } from '../../../helpers/constants';
import { SharedService } from "@app/core";
import { Subscription } from "rxjs";
import { UserModel } from "@app/helpers/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  userName = '';

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userSubscriber();
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if(this.userDetail){
          this.userName = this.userDetail?.first_name;
        }
        
      });
  };

  onLogout = () => {
    this.sharedService.logout();
    this.userName = '';
    // this.userAuthService.logOut().subscribe({
    //   next: (res) => {
    //     this.layoutService.setLayoutDetailCall(false);
    //   },
    //   error: (e) => console.error(e),
    // });
  };

  get homePageUrl() {
    return `${RouteConstant.HOME_PAGE}`;
  }

  get buildLeagueUrl() {
    return `${RouteConstant.UPLOAD_PLAYER_CONTAINER}`;
  }

  get completedLeague() {
    return `${RouteConstant.COMPLETED_LEAGUES}`;
  }

  get leagueList() {
    return `${RouteConstant.GENERATE_LEAGUE}`;
  }
  
  get isLoggedIn() {
    return this.sharedService.isLoggedIn();
  }

  get loginUrl() {
    return `${RouteConstant.LOGIN}`;
  }
}