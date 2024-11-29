import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCompiPageRoutingModule } from './edit-compi-routing.module';

import { EditCompiPage } from './edit-compi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCompiPageRoutingModule
  ],
  declarations: [EditCompiPage]
})
export class EditCompiPageModule {}
