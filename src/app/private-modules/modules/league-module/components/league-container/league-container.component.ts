import { Component } from '@angular/core';

@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent {
  groups!: any[];

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
