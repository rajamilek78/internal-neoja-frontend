import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedLeaguesComponent, LeagueContainerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
  {
    path : 'completed-league',
    component : CompletedLeaguesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
