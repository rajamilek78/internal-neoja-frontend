import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent {
  @Output() openCloseSidebar = new EventEmitter<boolean>();

  constructor(private router: Router) {}
  ngOnInit() {}

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
