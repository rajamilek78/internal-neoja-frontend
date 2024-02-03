import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPlayerContainerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: UploadPlayerContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPlayersRoutingModule {}
