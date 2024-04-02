import { Component } from '@angular/core';
import { RouteConstant } from '@app/helpers/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  get loginUrl() {
    return `${RouteConstant.LOGIN}`;
  }

  get homePageUrl() {
    return `${RouteConstant.HOME_PAGE}`;
  }

  openDemo() {
    window.open('https://calendly.com/eleagueonline/demo', '_blank');
  }
}
