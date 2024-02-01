import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from './components/components.export';

import { AuthRoutingModule } from './auth-routing.module';
import { UtilityModule } from '../../../utility/utility.module';


@NgModule({
  declarations: [
    ...authComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    UtilityModule,
    
  ]
})
export class AuthModule { }
