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
  // sideNavCollapsed = signal(false);
  // @Input() set collapsed(val: boolean) {
  //   this.sideNavCollapsed.set(val);
  // }
  @ViewChild('sidenav') sidenav!: ElementRef;
  @Output() sidebarClosed = new EventEmitter<void>();

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.closeSidenav();
    });
  }

  closeSidenav() {
    // Close the side navigation here
    // You can access the nativeElement property to manipulate the DOM
    this.sidenav.nativeElement.style.display = 'none';
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
}
