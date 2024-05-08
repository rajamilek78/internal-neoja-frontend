import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS, AppConstant } from '../../helpers/constants';
import { environment } from '../../../environments/environment';
import { APIManager } from "./api-manager.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // token = localStorage.getItem('token');
  private baseurl = environment.eloBuildRoundURL;

  // remove http from here and use apiManager service, similar to login
  constructor(private http: HttpClient,
    private apiManager: APIManager) {
  }

  getAllCompanies(): Observable<any> {
    return this.apiManager.getApis(API_ENDPOINTS.GET_ALL_COMPANIES, {}, true)
  }

  getAllClubsNew(path: string): Observable<any> {
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_CLUBS}/${path}`, {}, true)
  }


}
