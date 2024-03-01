import { Component } from '@angular/core';
import { RouteConstant } from '../../../helpers/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  get homePageUrl() {
    return `${RouteConstant.HOME_PAGE}`;
  }

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
