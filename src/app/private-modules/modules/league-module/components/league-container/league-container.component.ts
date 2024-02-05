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
  selectedFormat ='1';

  ngOnInit(): void {
    let matchData = localStorage.getItem('matchData');
    if (matchData) {
      let parsedData = JSON.parse(matchData);
      this.groups = Object.keys(parsedData.fixtures).map(key => ({
        name: key,
        data: parsedData.fixtures[key]
      }));
    } else {
      console.log('No match data found in local storage.');
    }
  }
}
