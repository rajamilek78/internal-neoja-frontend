import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueRoutingModule } from './league-routing.module';
import { leagueComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';
import { PrintContainerComponent } from './components/print-container/print-container.component';
@NgModule({
  declarations: [...leagueComponents, PrintContainerComponent],
  imports: [CommonModule, LeagueRoutingModule, UtilityModule],
})

export class LeagueModule {}
