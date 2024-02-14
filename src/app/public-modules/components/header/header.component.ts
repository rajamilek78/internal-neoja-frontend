import { Component } from '@angular/core';
import { RouteConstant } from '../../../helpers/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  get homePageUrl() {
    return `${RouteConstant.HOME_PAGE}`;
  }

  get buildLeagueUrl() {
    return `${RouteConstant.UPLOAD_PLAYER_CONTAINER}`;
  }

  // get completeLeagueUrl() {
  //   return `${RouteConstant.HOME_PAGE}`;
  // }

  get generateLeagueUrl() {
    return `${RouteConstant.GENERATE_LEAGUE}`;
  }

  get loginUrl() {
    return `${RouteConstant.LOGIN}`;
  }
}
