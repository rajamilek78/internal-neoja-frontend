import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { API_ENDPOINTS } from '@app/helpers/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletedLeagueService {

  constructor(private apiManager : APIManager) { }
  getAllRounds(path : string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_ROUND}/${path}`,{}, false);
  }

  getLeagueScores(path : string) : Observable<any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_SCORE}/${path}`,{},false);
  }
}
