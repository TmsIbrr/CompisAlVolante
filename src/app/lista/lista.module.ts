<<<<<<< HEAD
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
=======
import { NgModule } from '@angular/core';
>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';

import { ListaPage } from './lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule
  ],
<<<<<<< HEAD
  declarations: [ListaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
=======
  declarations: [ListaPage]
>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd
})
export class ListaPageModule {}
