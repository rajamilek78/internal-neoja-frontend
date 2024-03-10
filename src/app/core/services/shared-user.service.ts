import { Injectable } from '@angular/core';
import { APPStorage } from "@app/helpers/constants";
// import { EncryptionFunctions } from '@app/helpers/functions';
import { UserModel } from '@app/helpers/models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class SharedUserService {

  private userFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() { }

  private _user!: UserModel | null;

  getUser(): UserModel | null {
    if (!this._user) {
      const user = localStorage.getItem(APPStorage.USER) || '';
      try {
        this._user = JSON.parse(user);
      } catch (error) {
        this._user = null
      }
    }
    return this._user;
  }

  setUser(value: UserModel | null): void {
    localStorage.setItem(APPStorage.USER, JSON.stringify(value));
    this._user = value;
    this.setUserDetailCall(true);
  }

  isValidUser(user: any): boolean {
    return !!user;
  }

  /* Shared User detailChangeFlag for update status */
  setUserDetailCall(value: boolean): void {
    this.userFlag.next(value);
  }

  getUserDetailCall(): Observable<boolean> {
    return this.userFlag.asObservable();
  }

}
