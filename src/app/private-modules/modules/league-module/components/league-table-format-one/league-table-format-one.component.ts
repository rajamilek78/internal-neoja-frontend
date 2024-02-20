import { Component, OnInit, Input } from '@angular/core';
import { SharedCommonService } from '../../../../../core/services/shared-common.service';

@Component({
  selector: 'app-league-table-format-one',
  templateUrl: './league-table-format-one.component.html',
  styleUrl: './league-table-format-one.component.scss',
})
export class LeagueTableFormatOneComponent implements OnInit {
  @Input() data: any;
  @Input() groups : any;
  @Input() isEdit !: boolean 
  gamesArray: any;
  // matchData: any;
  constructor(private SharedCommonService: SharedCommonService) {}

  ngOnInit(): void {
    console.log(this.isEdit)
    if (this.groups && this.groups.length > 0) {
        this.gamesArray = Object.entries(this.groups[0].data.games);
    }
}

}
