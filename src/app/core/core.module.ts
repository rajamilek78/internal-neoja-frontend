import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiManagerService } from './services';
import { UtilityModule } from '../utility/utility.module';



@NgModule({
  declarations: [],
  providers : [
    ApiManagerService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
