import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonService } from './common.service';
import { API_ENDPOINTS } from '../../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class SharedCommonService {

  private matchData = new BehaviorSubject<any>(null);

  constructor() { }

  setMatchData( data : any){
    this.matchData.next(data);
    
  }

  getMatchData(){
    return this.matchData.asObservable();
  }

  
}
