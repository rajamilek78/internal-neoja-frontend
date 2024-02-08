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
    // console.log("this is updated data :", this.matchData);
    
  }
  getMatchData(){
    return this.matchData.asObservable();
  }
}
