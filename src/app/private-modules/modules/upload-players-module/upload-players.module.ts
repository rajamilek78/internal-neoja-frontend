import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UtilityModule } from '../../../utility/utility.module';
import { UploadPlayersRoutingModule } from './upload-players-routing.module';
import { uploadPlayerComponents } from './components/components.export';

@NgModule({
  declarations: [...uploadPlayerComponents],
  imports: [CommonModule, UtilityModule, UploadPlayersRoutingModule],
  providers : [DatePipe]
})
export class UploadPlayersModule {}
