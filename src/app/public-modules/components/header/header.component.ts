import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  signal,
  computed,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { RouteConstant } from '../../../helpers/constants';
import { LeaguemanageService, SharedCommonService, SharedService } from '@app/core';
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
  @Output() openCloseSidebar = new EventEmitter<boolean>();
  @Input() showSidebar = false;

  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  userName = '';
  clubName = '';

  // collapsed = signal(false);

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private SharedCommonService: SharedCommonService,
    private leagueService: LeaguemanageService,
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
    this.leagueService.setSelectedLeague(null)
  };

  onOpenCloseSidebar = (val: boolean) => {
    this.openCloseSidebar.emit(val);
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

  openDialogue(): void {
    const dialogueRef = this.dialog.open(SignupDialogueComponent, {
      width: '450px',
    });
  }
}
