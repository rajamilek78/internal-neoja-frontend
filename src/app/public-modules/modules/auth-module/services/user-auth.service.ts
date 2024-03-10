import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { APIManager, SharedService, SharedUserService } from "@app/core";
import { API_ENDPOINTS, AppConstant } from "@app/helpers/constants";
import { UserModel } from "@app/helpers/models";
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class UserAuthService {

  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  userName = '';
  clubName = '';

  constructor(private apiManager: APIManager,
    private sharedService: SharedService, private sharedUserService: SharedUserService) {
  }

  logIn = (data : any): Observable<any> => {
    return this.apiManager.postApis(`${API_ENDPOINTS.LOGIN}`,data,false,true)
  };

  handleAuthResponse = (response) => {
    const user = { ...response };
    this.sharedService.setUser(user);
    this.userSubscriber();
  };

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService.getUserDetailCall().subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
      });
  };
}
