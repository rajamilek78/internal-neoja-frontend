import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueContainerComponent, PrintContainerComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
  { path : 'print-container', component :PrintContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
