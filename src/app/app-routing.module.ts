import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
//Importando AuthGuard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
=======
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd
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
<<<<<<< HEAD
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

=======
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
];
>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
