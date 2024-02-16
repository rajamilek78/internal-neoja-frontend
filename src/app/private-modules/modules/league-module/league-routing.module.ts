import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CompletedLeaguesComponent,
  LeagueContainerComponent,
  ViewScoreTableComponent,
} from './components';
import { RouteConstant } from '../../../helpers/constants';

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
  {
    path: RouteConstant.COMPLETED_LEAGUES,
    component: CompletedLeaguesComponent,
  },

  {
    path: RouteConstant.VIEW_SCORES,
    component: ViewScoreTableComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
