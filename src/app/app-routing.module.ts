import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadDataComponent } from './private-modules/components/upload-data/upload-data.component';

const routes: Routes = [{
  path:'auth',
  loadChildren : () => import('./public-modules/modules/auth-module/auth.module').then((m) => m.AuthModule)
},
{path : 'upload', component : UploadDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
