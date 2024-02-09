import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  private baseurl = "https://build-round-hy3odlnrxq-ue.a.run.app/";

  constructor(private http : HttpClient) { }

  get(path : string, token? : string){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get(`${this.baseurl}${path}`, { headers });
  }

  postFile(data : FormData,token?:string) : Observable<any>{
    const headers = new HttpHeaders(
      {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    )

    const options = {headers : headers}
    return this.http.post(`${this.baseurl}file`,data)

  }
  postCsv(data : any,token?:string) : Observable<any>{
    const headers = new HttpHeaders(
      {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'text/csv'
      })

    const options = {headers : headers}
    return this.http.post(`${this.baseurl}+ 'csv'`,data)

  }

  post(path: string, data: any, token?: string)  {
    const headers = new HttpHeaders({
      // 'Content-Type': 'text/csv',
      // 'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseurl}${path}`, data, { headers });
  }

  
}
