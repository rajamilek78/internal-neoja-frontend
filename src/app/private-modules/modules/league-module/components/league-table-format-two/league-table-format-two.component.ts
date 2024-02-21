import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-league-table-format-two',
  templateUrl: './league-table-format-two.component.html',
  styleUrl: './league-table-format-two.component.scss',
})
export class LeagueTableFormatTwoComponent implements OnInit {
  gamesArray: any;
  league: any;
  games: any;
  players: any;
  isServing: boolean = true;
  selectedTabIndex = 0;
  @Output() blurTeamScore = new EventEmitter<any>();
  @Input() isEdit!: boolean;
  // teamOnePlayer: any = [];
  // teamTwoPlayer: any = [];
  // allPlayers = [];

  @Input() groups: any;
  @Input() responseData: any;

  ngOnInit(): void {
    if (this.groups && this.groups.length > 0) {
      this.games = Object.entries(this.groups[this.selectedTabIndex].data.games);
      // Initialize score property for each game
      this.games.forEach(game => {
        if (!game[1].score) {
          game[1].score = {};
        }
      });
      console.log(this.groups);
      this.players = this.groups.map(group => group.data.group_details.players);
      console.log(this.players);
    }
  }
  // updateScore(player, game, newScore) {
  //   game[1].score[player] = newScore;
  //   this.scoreUpdated.emit(this.games);
  // }
  onTabChanged($event) {
    let clickedIndex = $event.index;
    this.selectedTabIndex = clickedIndex;
    this.games = Object.entries(
      this.groups[this.selectedTabIndex].data.games
    );
  }
}

