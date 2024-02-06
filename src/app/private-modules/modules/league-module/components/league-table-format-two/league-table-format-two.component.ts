import { Component, Input, OnInit } from '@angular/core';

interface Game {
  bye: string[];
  returner: string;
  score: { team_1: number; team_2: number };
  server: string;
  team_1: string[];
  team_2: string[];
}

interface GroupDetails {
  captain: string;
  court: number;
  id: number;
  number_of_players: number;
  players: string[];
}

interface Group {
  games: { [key: string]: Game };
  group_details: GroupDetails;
}

@Component({
  selector: 'app-league-table-format-two',
  templateUrl: './league-table-format-two.component.html',
  styleUrl: './league-table-format-two.component.scss'
})
export class LeagueTableFormatTwoComponent implements OnInit{
  gamesArray : any;
  league : any;
  
  @Input() data : any;
  @Input() responseData : any;
  
  ngOnInit(): void {
    this.gamesArray = Object.entries(this.data.games);
    console.log("this is data : ",this.gamesArray);
    
    this.league = this.data.league;
  }
 
  
}
