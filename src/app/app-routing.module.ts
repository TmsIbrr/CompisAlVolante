import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Importando AuthGuard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./recuperar-contra/recuperar-contra.module').then( m => m.RecuperarContraPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule), canActivate: [AuthGuard]
  },
  { path: 'edit/:id', loadChildren: () => import('./edit-compi/edit-compi.module').then(m => m.EditCompiPageModule) },
  {
    path: 'unirse-viaje',
    loadChildren: () => import('./unirse-viaje/unirse-viaje.module').then( m => m.UnirseViajePageModule), canActivate: [AuthGuard]
  },

  {
    path: 'unirse-viaje',
    loadChildren: () => import('./unirse-viaje/unirse-viaje.module').then( m => m.UnirseViajePageModule), canActivate: [AuthGuard]
  },

  {
    path: 'unirse-viaje/:viajeId',
    loadChildren: () => import('./unirse-viaje/unirse-viaje.module').then(m => m.UnirseViajePageModule)
  },
  {
    path: 'edit-unirse',
    loadChildren: () => import('./edit-unirse/edit-unirse.module').then( m => m.EditUnirsePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'edit-unirse/:viajeId/:userId',
    loadChildren: () => import('./edit-unirse/edit-unirse.module').then(m => m.EditUnirsePageModule)
  },


  ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
