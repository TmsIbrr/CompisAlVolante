import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

interface ViajeData {
  espaciosDisponibles: number;
  compis: { id: string; nombre: string }[];
  destino: string;
  nombreConductor: string;
  colorVehiculo: string;
  patenteVehiculo: string;
}

@Component({
  selector: 'app-unirse-viaje',
  templateUrl: './unirse-viaje.page.html',
  styleUrls: ['./unirse-viaje.page.scss'],
})
export class UnirseViajePage implements OnInit {

  viajeId: string;
  userId: string = '';
  viajeData: ViajeData | undefined;
  isJoined: boolean = false;
  newCompiName: string = '';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.viajeId = this.route.snapshot.paramMap.get('viajeId') || '';
  }

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userId = user.uid;
    }

    if (this.viajeId) {
      this.loadViajeData();
    } else {
      this.showAlert('Error', 'ID del viaje no encontrado.');
      this.router.navigate(['/lista']);
    }
  }

  async loadViajeData() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos del viaje...',
    });
    await loading.present();

    this.firestore.collection('viajes').doc(this.viajeId).valueChanges().subscribe(data => {
      this.viajeData = data as ViajeData;
      this.checkIfJoined();
      loading.dismiss();
    }, error => {
      loading.dismiss();
      this.showAlert('Error', 'No se pudo cargar la información del viaje.');
    });
  }

  checkIfJoined() {
    if (this.viajeData?.compis) {
      this.isJoined = this.viajeData.compis.some(compi => compi.id === this.userId);
    }
  }

  async unirseAlViaje() {
    const loading = await this.loadingCtrl.create({
      message: 'Uniéndote al viaje...',
    });
    await loading.present();

    try {
      const viajeRef = this.firestore.collection('viajes').doc(this.viajeId);

      await this.firestore.firestore.runTransaction(async (transaction) => {
        const viajeDoc = await transaction.get(viajeRef.ref);
        const viajeData = viajeDoc.data() as ViajeData;

        if (viajeData && viajeData.espaciosDisponibles > 0) {
          const compis = viajeData?.compis || [];
          if (!compis.some(compi => compi.id === this.userId)) {
            compis.push({ id: this.userId, nombre: 'Nombre del Usuario' });
            transaction.update(viajeRef.ref, {
              compis: compis,
              espaciosDisponibles: viajeData.espaciosDisponibles - 1
            });
            this.isJoined = true;
          } else {
            throw new Error('Ya estás unido a este viaje.');
          }
        } else {
          throw new Error('No hay espacios disponibles en este viaje.');
        }
      });

      loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Te has unido al viaje exitosamente.',
        buttons: ['OK']
      });
      await alert.present();

    } catch (error: any) {
      loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message || 'Ocurrió un error al unirte al viaje.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async agregarCompi() {
    if (this.newCompiName.trim().length === 0) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El nombre del compi no puede estar vacío.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const viajeRef = this.firestore.collection('viajes').doc(this.viajeId);
    await viajeRef.update({
      compis: [...(this.viajeData?.compis || []), { id: Date.now().toString(), nombre: this.newCompiName }]
    });

    this.newCompiName = '';
  }

  async eliminarCompi(compiId: string) {
    const viajeRef = this.firestore.collection('viajes').doc(this.viajeId);
    const compisActualizados = (this.viajeData?.compis || []).filter(compi => compi.id !== compiId);
    await viajeRef.update({ compis: compisActualizados });
  }

  async cancelarSolicitud() {
    const loading = await this.loadingCtrl.create({
      message: 'Cancelando solicitud...',
    });
    await loading.present();

    try {
      const viajeRef = this.firestore.collection('viajes').doc(this.viajeId);

      await this.firestore.firestore.runTransaction(async (transaction) => {
        const viajeDoc = await transaction.get(viajeRef.ref);
        const viajeData = viajeDoc.data() as ViajeData;

        if (viajeData) {
          const compis = viajeData.compis || [];
          const compisActualizados = compis.filter(compi => compi.id !== this.userId);

          transaction.update(viajeRef.ref, {
            compis: compisActualizados,
            espaciosDisponibles: viajeData.espaciosDisponibles + 1
          });
          this.isJoined = false;
        }
      });

      loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Solicitud Cancelada',
        message: 'Has cancelado tu solicitud al viaje.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/lista']);

    } catch (error: any) {
      loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message || 'Ocurrió un error al cancelar la solicitud.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}







