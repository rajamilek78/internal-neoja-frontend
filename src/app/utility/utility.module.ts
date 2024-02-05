import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { utilityComponents } from './components/components-export';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...utilityComponents],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,HttpClientModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,HttpClientModule],
})
export class UtilityModule {}
