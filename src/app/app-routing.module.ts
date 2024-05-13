import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstant } from './helpers/constants';
import { AppAuthGuard } from './utility/_guards';
import { HomePageComponent } from './public-modules/components/home-page/home-page.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: RouteConstant.HIGH_SCORE,
    loadChildren: () =>
      import('./private-modules/high-score-module/high-score.module').then(
        (m) => m.HighScoreModule
      ),
      // canActivate: [AppAuthGuard]
  },

  {
    path: RouteConstant.MANAGER,
    loadChildren: () =>
      import('./private-modules/manager-module/manager.module').then(
        (m) => m.ManagerModule
      ),
      // canActivate: [AppAuthGuard]
  },

  {
    path: RouteConstant.SCORE_FEED,
    loadChildren: () =>
      import('./private-modules/score-feed-module/score-feed.module').then(
        (m) => m.ScoreFeedModule
      ),
      // canActivate: [AppAuthGuard]
  },

  {
    path: '**',
    component: HomePageComponent,
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
