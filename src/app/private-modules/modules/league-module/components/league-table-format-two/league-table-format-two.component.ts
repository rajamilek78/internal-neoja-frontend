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
  @Output() selectedTab = new EventEmitter<number>();
  @Input() isEdit!: boolean;
  @Input() groups: any;
  @Input() data: any;
  @Input() responseData: any;
  @Input() leagueID!: string;
  @Input() clubID!: string;
  @Input() roundCount!: string;
  @Input() leagueName!: string;
  @Input() labelName!: string ;

  ngOnInit(): void {
    this.selectedTab.emit(this.selectedTabIndex + 1);
    if (this.groups && this.groups.length > 0) {
      this.games = Object.entries(this.groups[this.selectedTabIndex].data.games);
      // Initialize score property for each game
      this.games.forEach(game => {
        if (!game[1].score) {
          game[1].score = {};
        }
      });
      this.players = this.groups.map(group => group.data.group_details.players);
    }
  }
  onBlurTeamScore = () => {
    const groups = JSON.parse(JSON.stringify(this.groups));
    const gameObj: any = {};
    for (let i = 0; i < this.games.length; i++) {
      const game = this.games[i];
      const gameName = game[0];
      const gameVal = game[1];
      gameObj[gameName] = gameVal;
    }
    groups[this.selectedTabIndex].data.games = { ...gameObj };
    this.blurTeamScore.emit({
      groups: [...groups],
      isTouched: true
    });
};

onTabChanged($event) {
    let clickedIndex = $event.index;
    this.selectedTabIndex = clickedIndex;
    this.selectedTab.emit(this.selectedTabIndex + 1);
    this.games = Object.entries(
      this.groups[this.selectedTabIndex].data.games
    );
};

}

