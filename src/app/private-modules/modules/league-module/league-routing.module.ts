import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueContainerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
