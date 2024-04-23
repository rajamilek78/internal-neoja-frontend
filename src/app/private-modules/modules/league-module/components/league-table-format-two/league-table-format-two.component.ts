import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SharedCommonService } from "../../../../../core/services/shared-common.service";
import { SnackBarService } from "@app/core/services/snackbar.service";

@Component({
  selector: "app-league-table-format-two",
  templateUrl: "./league-table-format-two.component.html",
  styleUrl: "./league-table-format-two.component.scss",
})
export class LeagueTableFormatTwoComponent implements OnInit {
  @Input() data: any;
  @Input() leagueID!: string;
  @Input() clubID!: string;
  @Input() roundCount!: string;
  @Input() leagueName!: string;
  @Input() groups: any;
  @Input() labelName!: string;
  @Output() blurTeamScore = new EventEmitter<any>();
  @Output() selectedTab = new EventEmitter<number>();
  @Input() isEdit!: boolean;
  gamesArray: any;
  selectedTabIndex = 0;

  constructor(private SharedCommonService: SharedCommonService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.selectedTab.emit(this.selectedTabIndex + 1);
    if (this.groups && this.groups.length > 0) {
      this.gamesArray = Object.entries(
        this.groups[this.selectedTabIndex].data.games
      );
      this.blurTeamScore.emit({
        groups: this.groups,
      });
    }
  }

  onTabChanged($event) {
     // Handle tab change event
    let clickedIndex = $event.index;
    this.selectedTabIndex = clickedIndex;
    this.selectedTab.emit(this.selectedTabIndex + 1);
    this.gamesArray = Object.entries(
      this.groups[this.selectedTabIndex].data.games
    );
  }

  onBlurTeamScore = () => {
     // Emit event on team score blur
    const groups = JSON.parse(JSON.stringify(this.groups));
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
      isTouched: true,
    });
  };
}
