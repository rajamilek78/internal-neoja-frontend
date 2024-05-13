import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { managerModuleComponents } from './components/components.export';

@NgModule({
  declarations: [managerModuleComponents],
  imports: [CommonModule, ManagerRoutingModule],
})
export class ManagerModule {}
