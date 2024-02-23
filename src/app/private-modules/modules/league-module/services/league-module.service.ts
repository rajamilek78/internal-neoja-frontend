import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { API_ENDPOINTS } from '@app/helpers/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueModuleService {

  constructor(private apiManager : APIManager) { }

  getRoundByID(path : string): Observable <any>{
    return this.apiManager.getApis(`${API_ENDPOINTS.GET_ROUND_BY_ID}/${path}`,{}, true);
  }
  updateScore(path : string, bodyData : any): Observable <any>{
    return this.apiManager.postApis(`${API_ENDPOINTS.UPDATE_ROUND_BY_ID}/${path}`,bodyData, true);
  }
}
