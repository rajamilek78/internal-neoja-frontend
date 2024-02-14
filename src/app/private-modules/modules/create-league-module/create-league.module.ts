import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from '../../../utility/utility.module';
import { CreateLeagueRoutingModule } from './create-league-routing.module';
import { createLeagueComponents } from './components/components.export';
import { CreateLeagueDialogComponent } from './components/create-league-dialog/create-league-dialog.component';

@NgModule({
  declarations: [...createLeagueComponents, CreateLeagueDialogComponent],
  imports: [CommonModule, CreateLeagueRoutingModule, UtilityModule],
})
export class CreateLeagueModule {}
