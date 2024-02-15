import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIManager, CommonService, SharedService, SharedUserService } from './services';
import { UtilityModule } from '../utility/utility.module';
import { HttpInterceptors } from "./http-interceptors/index-Interceptor";



@NgModule({
  declarations: [],
  providers : [
    HttpInterceptors,
    CommonService,
    SharedService,
    SharedUserService,
    APIManager,
  ],
  imports: [
    CommonModule,
    UtilityModule
  ]
})
export class CoreModule { }
