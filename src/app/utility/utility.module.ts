import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { utilityComponents } from './components/components-export';
import { HttpClientModule } from '@angular/common/http';
import { utilityDirectives } from './directives/directive-export';

@NgModule({
  declarations: [...utilityComponents,...utilityDirectives],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
})
export class UtilityModule { }
