import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedCommonService } from '../../../../../core/services/shared-common.service';

@Component({
  selector: 'app-league-table-format-one',
  templateUrl: './league-table-format-one.component.html',
  styleUrl: './league-table-format-one.component.scss',
})
export class LeagueTableFormatOneComponent implements OnInit {
  @Input() data: any;
  @Input() leagueID!: string;
  @Input() clubID!: string;
  @Input() roundCount!: string;
  @Input() groups: any;
  @Output() blurTeamScore = new EventEmitter<any>();
  @Input() isEdit !: boolean 
  gamesArray: any;
  selectedTabIndex = 0;

  constructor(private SharedCommonService: SharedCommonService) {}

  ngOnInit(): void {
    console.log(this.groups);
    console.log(this.data);
    
    // console.log(this.isEdit)
    if (this.groups && this.groups.length > 0) {
      this.gamesArray = Object.entries(
        this.groups[this.selectedTabIndex].data.games
      );
      console.log("this is gamesarray",this.gamesArray);
      
      this.blurTeamScore.emit({
        groups: this.groups,
      });
    }
  }

  onTabChanged($event) {
    let clickedIndex = $event.index;
    this.selectedTabIndex = clickedIndex;
    this.gamesArray = Object.entries(
      this.groups[this.selectedTabIndex].data.games
    );
  }

  onBlurTeamScore = () => {
    const groups = JSON.parse(JSON.stringify(this.groups));
    console.log(groups);
    
    const gameObj: any = {};
    for (let i = 0; i < this.gamesArray.length; i++) {
      const game = this.gamesArray[i];
      const gameName = game[0];
      const gameVal = game[1];
      gameObj[gameName] = gameVal;
    }
    groups[this.selectedTabIndex].data.games = { ...gameObj };
    this.blurTeamScore.emit({
      groups: [...groups],
    });
  };
}
