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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsPageComponent,
    AboutUsPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UtilityModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
