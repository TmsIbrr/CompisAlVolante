import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnirseViajePageRoutingModule } from './unirse-viaje-routing.module';

import { UnirseViajePage } from './unirse-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnirseViajePageRoutingModule
  ],
  declarations: [UnirseViajePage]
})
export class UnirseViajePageModule {}


