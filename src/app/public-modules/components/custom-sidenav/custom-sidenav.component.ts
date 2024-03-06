import { Component, Input, signal } from '@angular/core';
import { RouteConstant } from '@app/helpers/constants';

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent {
  // sideNavCollapsed = signal(false);
  // @Input() set collapsed(val: boolean) {
  //   this.sideNavCollapsed.set(val);
  // }

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
