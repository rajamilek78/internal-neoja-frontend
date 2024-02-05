import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPlayersModule } from './private-modules/modules/upload-players-module/upload-players.module';
import { RouteConstant } from './helpers/constants';
const routes: Routes = [
  {
    path: RouteConstant.AUTH,
    loadChildren: () =>
      import('./public-modules/modules/auth-module/auth.module').then(
        (m) => m.AuthModule
      ),
  },

  {
    path: RouteConstant.UPLOAD_PLAYER_CONTAINER,
    loadChildren: () =>
      import(
        './private-modules/modules/upload-players-module/upload-players.module'
      ).then((m) => m.UploadPlayersModule),
  },

  {
    path: RouteConstant.LEAGUE_CONTAINER,
    loadChildren: () =>
      import('./private-modules/modules/league-module/league.module').then(
        (m) => m.LeagueModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
