import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueContainerComponent,  } from './components';
import { PrintRoundFormatOneComponent } from './components/print-round-format-one/print-round-format-one.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueContainerComponent,
  },
  { path : 'print', component :PrintRoundFormatOneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
