import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from '../../../utility/utility.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { contactUsComponents } from './components/components.export';

@NgModule({
  declarations: [...contactUsComponents],
  imports: [CommonModule, ContactUsRoutingModule, UtilityModule],
})
export class ContactUsModule {}
