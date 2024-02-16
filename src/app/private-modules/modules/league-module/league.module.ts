import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from '../../../utility/utility.module';
import { LeagueRoutingModule } from './league-routing.module';
import { leagueComponents } from './components/components.export';
@NgModule({
  declarations: [...leagueComponents],
  imports: [CommonModule, LeagueRoutingModule, UtilityModule],
})
export class LeagueModule {}
