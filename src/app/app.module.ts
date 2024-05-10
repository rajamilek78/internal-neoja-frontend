import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UtilityModule } from './utility/utility.module';
import { LeaguemanageService } from './core/services/league.service';
import { CoreModule } from './core';
import { API_ENDPOINTS } from './helpers/constants';
import { HomePageComponent } from './public-modules/components/home-page/home-page.component';
import { HeaderComponent } from './public-modules/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    UtilityModule
  ],
  providers: [API_ENDPOINTS,  LeaguemanageService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
