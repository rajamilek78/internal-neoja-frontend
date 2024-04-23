import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SharedCommonService } from "../../../../../core/services/shared-common.service";
import { SnackBarService } from "@app/core/services/snackbar.service";

@Component({
  selector: "app-league-table-format-one",
  templateUrl: "./league-table-format-one.component.html",
  styleUrl: "./league-table-format-one.component.scss",
})
export class LeagueTableFormatOneComponent implements OnInit {
  @Input() data: any;
  @Input() leagueID!: string;
  @Input() clubID!: string;
  @Input() roundCount!: string;
  @Input() leagueName!: string;
  @Input() leagueType!: string;
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
    let clickedIndex = $event.index;
    this.selectedTabIndex = clickedIndex;
    this.selectedTab.emit(this.selectedTabIndex + 1);
    this.gamesArray = Object.entries(
      this.groups[this.selectedTabIndex].data.games
    );
  }

  onBlurTeamScore = () => {
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

  updateScore(currentPlayerObj: any, gamesArr: any) {
    // force same score if the league type is doubles-individual...
    if (this.leagueType === "doubles-individual") {
      let index = gamesArr.findIndex(
        (x: any) =>
          x.subgroup === currentPlayerObj.subgroup &&
          x.player !== currentPlayerObj.player
      );
      if (index > -1) {
        gamesArr[index].score = currentPlayerObj.score;
      }
    }
    this.onBlurTeamScore();
  }

  getPlayerNamesColumnTitle() {
    let plyaerNamesColTitle: string = "";
    switch (this.leagueType) {
      case "singles":
        plyaerNamesColTitle = "Player";
        break;
      case "doubles-individual":
        plyaerNamesColTitle = "Player";
        break;
      case "doubles-partner":
        plyaerNamesColTitle = "Team";
        break;
      default:
        plyaerNamesColTitle = "Players";
    }

    return plyaerNamesColTitle;
  }

  getPlayerRolesColumnTitle() {
    let plyaerRolesColTitle: string = "";
    switch (this.leagueType) {
      case "singles":
        plyaerRolesColTitle = "Set";
        break;
      case "doubles-partner":
        plyaerRolesColTitle = "Set";
        break;
      case "doubles-individual":
        plyaerRolesColTitle = "Game";
        break;
      default:
        plyaerRolesColTitle = "";
    }

    return plyaerRolesColTitle;
  }
}
