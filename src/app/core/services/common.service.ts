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
  private baseurl = environment.apiUrl;

  // remove http from here and use apiManager service, similar to login
  constructor(private http: HttpClient,
    private apiManager: APIManager) {
  }

  getAllCompanies(): Observable<any> {
    return this.apiManager.getApis(API_ENDPOINTS.GET_ALL_COMPANIES, {}, false)
  }

  getAllClubsNew(path: string): Observable<any> {
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_CLUBS}/${path}`, {}, false)
  }
  getAllLeagues(path: string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_LEAGUES}/${path}`, {}, false)
  }
  getRounds(path: string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_ROUND}/${path}`, {}, false)
  }
  getLeaguesSummary(path: string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_LEAGUES_SUMMARY}/${path}`, {}, false)
  }
  creatRound(path : string , bodyData){
    return this.apiManager.postApis(`${API_ENDPOINTS.CREAT_ROUND}/${path}`, bodyData, false)
  }

  getAllClubs(path: string, token?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers }
    return this.http.get(`${API_ENDPOINTS.GET_CLUBS}/${path}`);
  }

  get(path: string, token?: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers }
    return this.http.get(`${this.baseurl}${path}`);
  }

  postFile(data: FormData, token?: string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    const options = { headers: headers }
    return this.http.post(`${this.baseurl}/file`, data)
  }

  postCsv(data: any, token?: string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/csv'
      })

    const options = { headers: headers }
    return this.http.post(`${this.baseurl}/csv`, data)

  }

  post(path: string, data: any, token?: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers }
    return this.http.post(`${this.baseurl}/${path}`, data);
  }


}
