import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from './components/components.export';
import { AuthRoutingModule } from './auth-routing.module';
import { UtilityModule } from "@app/utility/utility.module";
import { UserAuthService } from "./services";


@NgModule({
  declarations: [
    ...authComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    UtilityModule,
  ],
  providers: [UserAuthService]
})
export class AuthModule { }
