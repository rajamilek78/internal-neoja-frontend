import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../helpers/constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  private baseurl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getAllCompanies(token? : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    const options = { headers : headers }
    return this.http.get(API_ENDPOINTS.GET_ALL_COMPANIES);
  }
  getAllClubs(path : string,token? : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    const options = { headers : headers }
    return this.http.get( `${API_ENDPOINTS.GET_CLUBS}/${path}`);
    
  }



  get(path : string, token? : string){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    const options = {headers : headers}
    return this.http.get(`${this.baseurl}${path}`);
  }

  postFile(data : FormData,token?:string) : Observable<any>{
    const headers = new HttpHeaders(
      {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    )

    const options = {headers : headers}
    return this.http.post(`${this.baseurl}/file`,data)

  }
  postCsv(data : any,token?:string) : Observable<any>{
    const headers = new HttpHeaders(
      {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'text/csv'
      })

    const options = {headers : headers}
    return this.http.post(`${this.baseurl}/csv`,data)

  }

  post(path: string, data: any, token?: string)  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const options = { headers : headers}
    return this.http.post(`${this.baseurl}/${path}`, data);
  }

  
}
