import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueRoutingModule } from './league-routing.module';
import { leagueComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';

@NgModule({
  declarations: [...leagueComponents],
  imports: [CommonModule, LeagueRoutingModule, UtilityModule],
})

export class LeagueModule {}
