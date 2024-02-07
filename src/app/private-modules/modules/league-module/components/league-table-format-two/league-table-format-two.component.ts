import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-table-format-two',
  templateUrl: './league-table-format-two.component.html',
  styleUrl: './league-table-format-two.component.scss'
})
export class LeagueTableFormatTwoComponent implements OnInit {
  gamesArray: any;
  league: any;
  games : any;
  players :  any;
  teamOnePlayer : any =[];
  teamTwoPlayer : any=[];
  allPlayers = [];


  @Input() data: any;
  @Input() responseData: any;

  ngOnInit(): void {
    
    // this.games = ["game 1","game 2","game 3","game 4","game 5"];
    // this.players = ["player 1","player 2","player 3","player 4","player 5"]

    // this.games = this.data.games;
    // console.log("this is games only :", this.games);
    

    this.games = Object.entries(this.data.games);
    this.players = Object.entries(this.data.group_details.players);
    // console.log(this.gamesArray);
    console.log("this is games",this.games);
    // console.log("type of game",typeof(this.games));
    console.log("this is players : ", this.players);
    console.log(typeof(this.players));

    // this.games.forEach(game => {
    //   this.teamOnePlayer = this.teamOnePlayer.concat(game[1].team_1);
    //   this.teamTwoPlayer = this.teamOnePlayer.concat(game[1].team_2);
    //   console.log("this is team one : ",this.teamOnePlayer);
      
    // });
    // this.games.forEach(game => {
    //   let teamOne = this.allPlayers.concat(game[1].team_1);
    //   let teamTwo= teamOne.concat(game[1].team_2);
    //   let bye = teamTwo.concat(game[1].bye);
    //   this.allPlayers = bye.concat(teamOne,teamTwo,bye)
      
    // });
    // this.allPlayers = [...new Set(this.allPlayers)];
    // console.log('all', this.allPlayers);
    
    
    
    
    // format gamesArray
    // this.gamesArray = this.gamesArray.map(e=>{
    //   const gameArray = [...e];
    //   gameArray[1].players = [...gameArray[1].bye,...gameArray[1].team_1,...gameArray[1].team_2]
    // return gameArray;
    // })

    // console.log("this is data : ", this.gamesArray);
    this.league = this.responseData.league;
  }
  // In your component
getTeamNumber(playerName: string, game: any): number {
  if (game[1].team_1.includes(playerName)) {
    return 1;
  } else if (game[1].team_2.includes(playerName)) {
    return 2;
  }
  return 0; // or whatever you want to return when the player is not found in any team
}



  getPalyerName = (game, idx: number): string => {
    let playerName = game[1].bye[0];

    switch (idx) {
      case 0:
        playerName = game[1].team_1[0]
        break;
      case 1:
        playerName = game[1].team_1[1]
        break;
      case 2:
        playerName = game[1].team_2[0]
        break;
      case 3:
        playerName = game[1].team_2[1]
        break;
      default:
        break;
    }
    return playerName
  }

  




}
