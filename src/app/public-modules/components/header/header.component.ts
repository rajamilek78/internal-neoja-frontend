import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  signal,
  computed,
} from '@angular/core';
import { RouteConstant } from '../../../helpers/constants';
import { SharedService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogueComponent } from '../signup-dialogue/signup-dialogue.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  userName = '';
  clubName = '';
  collapsed = signal(false);

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userSubscriber();
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
          this.userName = this.userDetail?.first_name;
          this.clubName = this.userDetail.club_id;
        }
      });
  };

  onLogout = () => {
    this.sharedService.logout();
    this.userName = '';
    this.clubName = '';
    // this.userAuthService.logOut().subscribe({
    //   next: (res) => {
    //     this.layoutService.setLayoutDetailCall(false);
    //   },
    //   error: (e) => console.error(e),
    // });
  };

  sidenavWidth = computed(() => (this.collapsed() ? '64px' : '250px'));

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

  openDialogue(): void {
    const dialogueRef = this.dialog.open(SignupDialogueComponent, {
      width: '450px',
    });
  }
}
