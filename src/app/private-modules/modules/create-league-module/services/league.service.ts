import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { API_ENDPOINTS } from '@app/helpers/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private apiManager : APIManager) {  }

  createLeague(path : string,data : any): Observable <any>{
    return this.apiManager.postApis(`${API_ENDPOINTS.CREATE_LEAGUE}/${path}`, data, false)
  }
}
