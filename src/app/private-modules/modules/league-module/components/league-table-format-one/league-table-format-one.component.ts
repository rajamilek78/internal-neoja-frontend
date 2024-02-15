import { Component, OnInit, Input } from '@angular/core';
import { SharedCommonService } from '../../../../../core/services/shared-common.service';

@Component({
  selector: 'app-league-table-format-one',
  templateUrl: './league-table-format-one.component.html',
  styleUrl: './league-table-format-one.component.scss',
})
export class LeagueTableFormatOneComponent implements OnInit {
  @Input() data: any;
  gamesArray: any;
  // matchData: any;
  constructor(private SharedCommonService: SharedCommonService) { }


  ngOnInit(): void {

    this.gamesArray = Object.entries(this.data.games);
    // console.log("this is game array", this.gamesArray)
  }

}


