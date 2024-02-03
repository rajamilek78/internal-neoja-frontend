import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { utilityComponents } from './components/components-export';

@NgModule({
  declarations: [...utilityComponents],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class UtilityModule {}
