import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './core';
import { SnackBarService } from './core/services/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'neoja';
  isLoading = false;
  private loaderSubscriber$!: Subscription;

  constructor(
    private sharedService: SharedService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

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

  get isLoggedIn() {
    return this.sharedService.isLoggedIn();
  }

  isHeaderVisible(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/';
  }
}
