import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreFeedRoutingModule } from './score-feed-routing.module';
import { scoreFeedModuleComponents } from './components/components.export';

@NgModule({
  declarations: [scoreFeedModuleComponents],
  imports: [CommonModule, ScoreFeedRoutingModule],
})
export class ScoreFeedModule {}
