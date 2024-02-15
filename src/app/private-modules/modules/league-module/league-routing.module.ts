import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedLeaguesComponent, LeagueContainerComponent } from './components';
import { RouteConstant } from "@app/helpers/constants";

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
  {
    path: RouteConstant.COMPLETED_LEAGUES,
    component: CompletedLeaguesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule { }
