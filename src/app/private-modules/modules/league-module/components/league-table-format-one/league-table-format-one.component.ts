import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../../../../helpers/services/shared.service';

@Component({
  selector: 'app-league-table-format-one',
  templateUrl: './league-table-format-one.component.html',
  styleUrl: './league-table-format-one.component.scss',
})
export class LeagueTableFormatOneComponent implements OnInit {
  @Input() data : any;
  gamesArray : any;
  // matchData: any;
  constructor(private sharedService: SharedService) { }


  ngOnInit(): void {

    this.gamesArray = Object.entries(this.data.games);

    // let matchData = localStorage.getItem('matchData');
    // if (matchData) {
    //   this.matchData = JSON.parse(matchData);
    //   console.log(this.matchData);
    // } else {
    //   console.log('No match data found in local storage.');
    // }
    


  }






}


