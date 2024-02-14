import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPlayersModule } from './private-modules/modules/upload-players-module/upload-players.module';
import { RouteConstant } from './helpers/constants';
import { HomePageComponent } from './public-modules/components/home-page/home-page.component';
import { AboutUsPageComponent } from './public-modules/components/about-us/about-us-page.component';
import { ContactUsPageComponent } from './public-modules/components/contact-us/contact-us-page.component';
import { homePageComponents } from './public-modules/modules/home-module/components/components.export';
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
<<<<<<< HEAD
  {path : RouteConstant.HOME_PAGE, component : HomePageComponent},
  { path : RouteConstant.ABOUT_US_PAGE, component : AboutUsPageComponent},
  { path : RouteConstant.CONTACT_US_PAGE, component:ContactUsPageComponent},
=======

  {
    path: RouteConstant.HOME_PAGE,
    loadChildren: () =>
      import('./public-modules/modules/home-module/home.module').then(
        (m) => m.HomeModule
      ),
  },

  {
    path: RouteConstant.ABOUT_US_PAGE,
    loadChildren: () =>
      import('./public-modules/modules/about-us-module/about-us.module').then(
        (m) => m.AboutUsModule
      ),
  },

  {
    path: RouteConstant.CONTACT_US_PAGE,
    loadChildren: () =>
      import(
        './public-modules/modules/contact-us-module/contact-us.module'
      ).then((m) => m.ContactUsModule),
  },

  {
    path: RouteConstant.GENERATE_LEAGUE,
    loadChildren: () =>
      import(
        './private-modules/modules/create-league-module/create-league.module'
      ).then((m) => m.CreateLeagueModule),
  },
>>>>>>> 60b4624e12e9a997347d63c6acb636fc0f06f1d6
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
