import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../services/viajes.service';
import { Viaje } from '../models/viaje.model';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  viajes: Viaje[] = [];

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajesService,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.viajesService.obtenerViajes().subscribe(
      (viajes: Viaje[]) => {
        this.viajes = viajes;
      },
      (error: any) => {
        console.error('Error loading viajes', error);
      }
    );
  }

  toggleLike(viaje: Viaje) {
    viaje.liked = !viaje.liked;
    this.viajesService.actualizarViaje(viaje);
  }

  VerCompis() {
    this.navCtrl.navigateRoot('/lista');
  }

  async openUpdateDetails() {
    const alert = await this.alertController.create({
      header: '¡Actualización en Progreso!',
      message: `Estamos trabajando en nuevas actualizaciones para mejorar tu experiencia. (CompisAlVolante)`,
      buttons: ['OK'], 
    });

    await alert.present();
  }
}

