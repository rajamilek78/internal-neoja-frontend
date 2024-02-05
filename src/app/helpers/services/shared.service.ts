import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private matchData = new BehaviorSubject<any>(null);


  constructor() { }

  setMatchData( data : any){
    this.matchData.next(data);
  }
  getMatchData(){
    return this.matchData.asObservable;
  }
}
