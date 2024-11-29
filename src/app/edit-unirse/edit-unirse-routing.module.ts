import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUnirsePage } from './edit-unirse.page';

const routes: Routes = [
  {
    path: '',
    component: EditUnirsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUnirsePageRoutingModule {}
