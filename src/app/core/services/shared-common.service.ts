import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonService } from './common.service';
import { API_ENDPOINTS } from '../../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class SharedCommonService {

  private matchData = new BehaviorSubject<any>(null);
  private companyID = new BehaviorSubject<any>('LFTM');
  private clubID = new BehaviorSubject<any>(null);
  private leagueID = new BehaviorSubject<any>(null);
  private roundID = new BehaviorSubject<any>(null);
  leagueChanged = new BehaviorSubject<any>(null);
  private selectedValue = new BehaviorSubject<string>('');
  selectedValue$: Observable<string> = this.selectedValue.asObservable();

  constructor() { }

  setMatchData( data : any){
    this.matchData.next(data);
    
  }

  getMatchData(){
    return this.matchData.asObservable();
  }

  //for company id 
  setCompanyID( data : any){
    this.companyID.next(data);
  }
  getCompanyID(){
    return this.companyID.asObservable();
  }

  //for club id
  setClubID( data : any){
    this.clubID.next(data);
  }
  
  getClubID(){
    return this.clubID.asObservable();
  }

  //for league id
  setLeagueID( data : any){
    this.leagueID.next(data);
    this.emitLeagueChanged(data);
  }
  getLeagueID(){
    return this.leagueID.asObservable();
  }

  //for round id 
  setRoundID( data : any){
    this.roundID.next(data);
  }
  getRoundID(){
    return this.roundID.asObservable();
  }
  emitLeagueChanged(leagueID: any) {
    this.leagueChanged.next(leagueID);
  }

  setSelectedValue(value: string) {
    this.selectedValue.next(value);
  }

  getSelectedValue(): Observable<string> {
    return this.selectedValue.asObservable();
  }
  
}
