import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreFeedRoutingModule } from './score-feed-routing.module';
import { scoreFeedModuleComponents } from './components/components.export';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [scoreFeedModuleComponents],
  imports: [CommonModule, ScoreFeedRoutingModule, ReactiveFormsModule],
})
export class ScoreFeedModule {}
