import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  APPStorage,
  RouteConstant,
} from "@app/helpers/constants";
import { BehaviorSubject, Observable } from "rxjs";
import { SharedUserService } from "./shared-user.service";

@Injectable()
export class SharedService extends SharedUserService {

  private taskCount = 0;
  private _token = "";
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  /* Shared User Token Param */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
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
    localStorage.clear();
  }

  logout(isRedirectToLogin = true): void {
    this.clearSession();
    if (isRedirectToLogin && this.router.url !== `/${RouteConstant.LOGIN}`) {
      this.router.navigate([`/${RouteConstant.LOGIN}`]);
    }
    // this._router.navigate([`/${RouteConstant.AUTH_LOGIN}`]);
  }

  /* Shared LoggedIn Param */
  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  setLoginRequired(val: boolean): void {
    this.isLoginRequired.next(val);
  }

}
