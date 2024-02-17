import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedLeagueRoutingModule } from './completed-league-routing.module';
import { UtilityModule } from '@app/utility/utility.module';
import { CompletedLeaguesComponent, ViewScoreTableComponent } from './components';


@NgModule({
  declarations: [CompletedLeaguesComponent, ViewScoreTableComponent],
  imports: [
    CommonModule,
    UtilityModule,
    CompletedLeagueRoutingModule
  ]
})
export class CompletedLeagueModule { }
