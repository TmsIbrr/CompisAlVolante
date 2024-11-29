import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCompiPage } from './edit-compi.page';

const routes: Routes = [
  {
    path: '',
    component: EditCompiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCompiPageRoutingModule {}
