import { Component } from '@angular/core';
import { RouteConstant } from '@app/helpers/constants';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
})
export class AboutUsPageComponent {
  get homePageUrl() {
    return `${RouteConstant.HOME_PAGE}`;
  }
}
