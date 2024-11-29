import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnirseViajePage } from './unirse-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: UnirseViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnirseViajePageRoutingModule {}
