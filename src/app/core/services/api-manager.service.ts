import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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

  post(path: string, data: any, token?: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = JSON.stringify(data);
    return this.http.post(`${this.baseurl}${path}`, body, { headers });
  }
  postFile(path: string, data: FormData, token?: string) {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.post(`${this.baseurl}${path}`, data);
  }
  
}
