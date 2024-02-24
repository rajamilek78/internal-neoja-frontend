import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueContainerComponent, PrintRoundComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
  { path : 'print', component : PrintRoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
