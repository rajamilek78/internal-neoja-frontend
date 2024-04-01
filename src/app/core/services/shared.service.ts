import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  APPStorage,
  RouteConstant,
} from "@app/helpers/constants";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { SharedUserService } from "./shared-user.service";

@Injectable()
export class SharedService extends SharedUserService {

  private taskCount = 0;
  private _token = "";
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userDetailSub$!: Subscription;
  private sessionTimeout: any; 

  constructor(private router: Router) {
    super();
  }

  /* Shared Loader Param */

  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setToken(value: string): void {
    this._token = value;
    localStorage.setItem(
      APPStorage.TOKEN,
      value
    );
  }

  getToken(): string {
    this._token = localStorage.getItem(APPStorage.TOKEN) || '';
    return this._token;
  }


  startSessionTimer(): void {
    this.stopSessionTimer();
    this.sessionTimeout = setTimeout(() => {
      this.logout();
    }, 24 * 60 * 60 * 1000);
  }

  stopSessionTimer(): void {
    clearTimeout(this.sessionTimeout);
  }

  /* Shared User Token Param */
  // isLoggedIn(): boolean {
  //   return !!this.getToken() && !!this.getUser();
  // }
  isLoggedIn(): boolean {
    return !!this.getUser();
   
}

  setLoader(val: boolean): void {
    if (val) {
      this.taskCount += 1;
    } else {
      this.taskCount -= 1;
      if (this.taskCount !== 0) {
        val = true;
      }
    }
    this.isLoading.next(val);
  }

  clearSession() {
    this.setToken('');
    this.setUser(null);
    this.setLoginRequired(false);
    // localStorage.clear();
  }

  logout(isRedirectToLogin = true): void {
    this.clearSession();
    if (isRedirectToLogin && this.router.url !== `/${RouteConstant.LOGIN}`) {
      this.router.navigate([`/${RouteConstant.LOGIN}`]);
    }
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
    // this._router.navigate([`/${RouteConstant.AUTH_LOGIN}`]);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 200);
  }

  /* Shared LoggedIn Param */
  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  setLoginRequired(val: boolean): void {
    this.isLoginRequired.next(val);
  }

}
