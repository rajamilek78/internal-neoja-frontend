import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedLeaguesComponent, ViewScoreTableComponent } from './components';
import { RouteConstant } from '@app/helpers/constants';

const routes: Routes = [
  {
    path: '',
    component: CompletedLeaguesComponent,
  },
  {
    path: RouteConstant.VIEW_SCORES,
    component: ViewScoreTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedLeagueRoutingModule { }
