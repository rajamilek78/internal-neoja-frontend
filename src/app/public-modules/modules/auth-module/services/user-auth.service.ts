import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { APIManager, SharedService } from "@app/core";
import { API_ENDPOINTS, AppConstant } from "@app/helpers/constants";
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthService {

  constructor(private apiManager: APIManager,
    private sharedService: SharedService) {
  }

  logIn = (data : any): Observable<any> => {
    return this.apiManager.postApis(`${API_ENDPOINTS.LOGIN}`,data,false,true)
  };

  handleAuthResponse = (response) => {
    const user = { ...response };
    this.sharedService.setUser(user);
  };
}
