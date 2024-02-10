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

  get generateLeagueUrl() {
    return `${RouteConstant.UPLOAD_PLAYER_CONTAINER}`;
  }

  // get leagueListUrl() {
  //   return `${RouteConstant.HOME_PAGE}`;
  // }

  get aboutUsUrl() {
    return `${RouteConstant.ABOUT_US_PAGE}`;
  }

  get contactUsUrl() {
    return `${RouteConstant.CONTACT_US_PAGE}`;
  }
  get loginUrl() {
    return `${RouteConstant.LOGIN}`;
  }
}
