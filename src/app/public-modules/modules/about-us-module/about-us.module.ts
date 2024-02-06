import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { aboutUsComponents } from './components/components.export';
import { UtilityModule } from '../../../utility/utility.module';

@NgModule({
  declarations: [...aboutUsComponents],
  imports: [CommonModule, AboutUsRoutingModule, UtilityModule],
})
export class AboutUsModule {}
