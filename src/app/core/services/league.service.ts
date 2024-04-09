import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaguemanageService {
  private selectedLeagueSubject = new BehaviorSubject<any>(null);
  selectedLeague$: Observable<any> = this.selectedLeagueSubject.asObservable();

  setSelectedLeague(league: any) {
    this.selectedLeagueSubject.next(league);
  }
  // getSelectedLeague(): any {
  //   return this.selectedLeagueSubject.getValue();
  // }
  getSelectedLeague(){
    return this.selectedLeagueSubject.asObservable();
  }
}
