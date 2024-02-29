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
    return this.apiManager.getApis(API_ENDPOINTS.GET_ALL_COMPANIES, {}, true)
  }

  getAllClubsNew(path: string): Observable<any> {
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_CLUBS}/${path}`, {}, true)
  }
  getAllLeagues(path: string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_LEAGUES}/${path}`, {}, true)
  }
  getRounds(path: string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_ROUND}/${path}`, {}, true)
  }
  getLeaguesSummary(path: string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_LEAGUES_SUMMARY}/${path}`, {}, true)
  }
  creatRound(path : string , bodyData){
    return this.apiManager.postApis(`${API_ENDPOINTS.CREAT_ROUND}/${path}`, bodyData, true)
  }
  lockScore(path: string){
    return this.apiManager.postApis(`${API_ENDPOINTS.LOCK_SCORE}/${path}`, true)
  }

  getAllClubs(token?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers }
    return this.http.get(`${API_ENDPOINTS.GET_CLUBS}`);
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

  // post(path: string, data: any, token?: string) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   const options = { headers: headers }
  //   return this.http.post(`${this.baseurl}/${path}`, data);
  // }

  uploadData(path: string,bodyData){
    return this.apiManager.postApis(`${API_ENDPOINTS.UPLOAD_DATA}/${path}`, bodyData, true)
  }
  uploadDataRound2(path: string,bodyData){
    return this.apiManager.postApis(`${API_ENDPOINTS.UPLOAD_DATA_Round2}/${path}`, bodyData, true)
  }
  uploadFile(path: string,bodyData){
    return this.apiManager.postApis(`${API_ENDPOINTS.UPLOAD_FILE}/${path}`, bodyData, true)
  }


}
