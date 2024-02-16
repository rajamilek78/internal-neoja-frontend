import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from './components/components.export';
import { AuthRoutingModule } from './auth-routing.module';
import { UtilityModule } from "@app/utility/utility.module";
import { UserAuthService } from "./services";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ...authComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    UtilityModule,
    ReactiveFormsModule,
  ],
  providers: [UserAuthService]
})
export class AuthModule { }
