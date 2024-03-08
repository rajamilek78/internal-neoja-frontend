import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './core';
import { SnackBarService } from './core/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eleague-online';
  isLoading = false;
  private loaderSubscriber$!: Subscription;
  // collapsed = signal(false);
  showSidebar = false;

  // sidenavWidth = computed(() => (this.collapsed() ? '250px' : '0px'));

  constructor(private sharedService: SharedService, private snackBarService : SnackBarService) {}

  ngOnInit(): void {
    this.subscribeIsLoading();
    this.snackBarService.initSnackBar();
  }

  ngOnDestroy() {
    if (this.loaderSubscriber$) {
      this.loaderSubscriber$.unsubscribe();
    }
  }

  subscribeIsLoading() {
    this.loaderSubscriber$ = this.sharedService
      .getLoader()
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  onOpenCloseSidebar = (val: boolean) => {
    this.showSidebar = val;
  };
}
