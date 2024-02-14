import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeagueComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: CreateLeagueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLeagueRoutingModule {}
