import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { CompisService } from '../services/compis.service';

@Component({
  selector: 'app-edit-unirse',
  templateUrl: './edit-unirse.page.html',
  styleUrls: ['./edit-unirse.page.scss'],
})
export class EditUnirsePage implements OnInit {
  viajeId: string = '';
  userId: string = '';
  compiData: any = { nombre: '', desde: '', hacia: '' };

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private compisService: CompisService  // Usa el servicio de Compis
  ) {}

  ngOnInit() {
    this.viajeId = this.route.snapshot.paramMap.get('viajeId') || '';
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    this.loadCompiData();
  }

  // Cargar los datos del compi usando el servicio
  async loadCompiData() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos...',
    });
    await loading.present();

    try {
      const compi = await this.compisService.getCompiById(this.userId);
      if (compi) {
        this.compiData = compi;
      }
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
      this.showAlert('Error', 'No se pudieron cargar los datos del compi.');
    }
  }

  // Guardar los cambios en los datos del compi
  async saveCompiData() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando cambios...',
    });
    await loading.present();

    try {
      await this.compisService.updateCompi(this.userId, this.compiData);
      loading.dismiss();
      this.navCtrl.navigateBack('/lista');  // Redirigir a la lista
    } catch (error) {
      loading.dismiss();
      this.showAlert('Error', 'No se pudieron guardar los cambios.');
    }
  }

  // Mostrar alerta en caso de error o mensaje
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}







