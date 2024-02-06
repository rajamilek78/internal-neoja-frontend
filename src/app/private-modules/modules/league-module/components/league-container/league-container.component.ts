import { Component } from '@angular/core';
import { SharedService } from '../../../../../helpers/services/shared.service';

@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent {
  constructor(private sharedService : SharedService){}
  groups: any;
  responseData : any;
  selectedFormat ='1';

  ngOnInit(): void {
    let matchData = localStorage.getItem('matchData');
    if (matchData) {
      this.responseData = JSON.parse(matchData);
      console.log("this is parsed data :",this.responseData);
      
      this.groups = Object.keys(this.responseData.fixtures).map(key => ({
        name: key,
        data: this.responseData.fixtures[key]
      }));
    } else {
      console.log('No match data found in local storage.');
    }
  }
}
