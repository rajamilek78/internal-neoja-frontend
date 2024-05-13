import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighScoreRoutingModule } from './high-score-routing.module';
import { highScoreModuleComponents } from './components/components.export';

@NgModule({
  declarations: [highScoreModuleComponents],
  imports: [CommonModule, HighScoreRoutingModule],
})
export class HighScoreModule {}
