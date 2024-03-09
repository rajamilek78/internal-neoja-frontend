import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@app/core';
import { RouteConstant } from '@app/helpers/constants';
import { UserModel } from '@app/helpers/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent implements OnInit{
  @Output() openCloseSidebar = new EventEmitter<boolean>();
  clubName!:string;
  userName!:string;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;

  constructor(private router: Router,private sharedService: SharedService) {}
  ngOnInit() {
    this.userSubscriber()
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

  onCloseSidebar = () => {
    this.openCloseSidebar.emit(false);
  };

  get buildLeagueUrl() {
    return `${RouteConstant.UPLOAD_PLAYER_CONTAINER}`;
  }

  get completedLeague() {
    return `${RouteConstant.COMPLETED_LEAGUES}`;
  }

  get leagueList() {
    return `${RouteConstant.GENERATE_LEAGUE}`;
  }
}
