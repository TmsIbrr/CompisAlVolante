import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUnirsePageRoutingModule } from './edit-unirse-routing.module';

import { EditUnirsePage } from './edit-unirse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUnirsePageRoutingModule
  ],
  declarations: [EditUnirsePage]
})
export class EditUnirsePageModule {}
