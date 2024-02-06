import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from '../../../utility/utility.module';
import { HomeRoutingModule } from './home-routing.module';
import { homePageComponents } from './components/components.export';

@NgModule({
  declarations: [...homePageComponents],
  imports: [CommonModule, HomeRoutingModule, UtilityModule],
})
export class HomeModule {}
