import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighScoreComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: HighScoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HighScoreRoutingModule {}
