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

  logIn = (params: string): Observable<any> => {
    // const headers = new HttpHeaders({
    //   'API-Key': `${AppConstant.API_KEY}`
    // });
    // const options = { headers }
    const url = `${API_ENDPOINTS.LOGIN}/${params}`;
    return this.apiManager.postApis(url)
  };

  handleAuthResponse = (response) => {
    const user = { ...response };
    this.sharedService.setUser(user);
  };
}
