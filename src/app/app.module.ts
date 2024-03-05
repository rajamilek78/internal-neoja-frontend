import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UtilityModule } from './utility/utility.module';
import { HeaderComponent } from './public-modules/components/header/header.component';
import { FooterComponent } from './public-modules/components/footer/footer.component';
import { ContactUsPageComponent } from './public-modules/components/contact-us/contact-us-page.component';
import { AboutUsPageComponent } from './public-modules/components/about-us/about-us-page.component';
import { HomePageComponent } from './public-modules/components/home-page/home-page.component';
import { API_ENDPOINTS } from './helpers/constants/api-constants';
import { CoreModule } from "./core";
import { DateFormatDirective } from './helpers/directives/date-format.directive';
import { SignupDialogueComponent } from './public-modules/components/signup-dialogue/signup-dialogue.component';
import { CustomSidenavComponent } from './public-modules/components/custom-sidenav/custom-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsPageComponent,
    AboutUsPageComponent,
    HomePageComponent,
    DateFormatDirective,
    SignupDialogueComponent,
    CustomSidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    UtilityModule,
  ],
  providers: [API_ENDPOINTS],
  bootstrap: [AppComponent],
})
export class AppModule { }
