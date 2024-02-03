import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UtilityModule } from './utility/utility.module';
import { HeaderComponent } from './private-modules/components/header/header.component';
import { FooterComponent } from './private-modules/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
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
export class AppModule {}
