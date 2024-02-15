import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SharedService } from "./core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eleague-online';
  isLoading = false;
  private loaderSubscriber$!: Subscription;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.subscribeIsLoading();
  }

  ngOnDestroy() {
    if (this.loaderSubscriber$) {
      this.loaderSubscriber$.unsubscribe()
    }
  }

  subscribeIsLoading() {
    this.loaderSubscriber$ = this.sharedService
      .getLoader()
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
}
