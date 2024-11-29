<<<<<<< HEAD
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
=======
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
<<<<<<< HEAD
export class RegisterPage {
  nombre: string = '';
  email: string = '';
  password: string = '';
  telefono: string = '';
  tipoUsuario: string = '';
  vehiculoId: string | undefined = undefined; // Cambiado a undefined
  vehiculoColor: string = '';
  vehiculoModelo: string = '';
  vehiculoPlaca: string = '';
  vehiculoCapacidad: number | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async onTipoUsuarioChange() {
    if (this.tipoUsuario === 'Conductor') {
      this.vehiculoId = await this.generateUniqueVehiculoId();
    } else {
      this.vehiculoId = undefined; // Cambiado a undefined
      this.resetVehicleFields();
    }
  }

  resetVehicleFields() {
    this.vehiculoColor = '';
    this.vehiculoModelo = '';
    this.vehiculoPlaca = '';
    this.vehiculoCapacidad = null;
  }

  async generateUniqueVehiculoId(): Promise<string> {
    let vehiculoId: string = '';
    let isUnique = false;

    while (!isUnique) {
      vehiculoId = Math.floor(100000 + Math.random() * 900000).toString();

      const snapshot = await this.firestore
        .collection('users', ref => ref.where('vehiculoId', '==', vehiculoId))
        .get()
        .toPromise();

      if (snapshot && snapshot.empty) {
        isUnique = true;
      }
    }

    return vehiculoId;
  }

  async registerUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando usuario...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      const userId = userCredential.user?.uid;
      if (userId) {
        await this.firestore.collection('users').doc(userId).set({
          nombre: this.nombre,
          email: this.email,
          telefono: this.telefono,
          tipoUsuario: this.tipoUsuario,
          vehiculoId: this.vehiculoId,
          creadoEn: new Date(),
          vehiculo: this.tipoUsuario === 'Conductor',
          viajesTotales: 0,
        });

        if (this.tipoUsuario === 'Conductor') {
          await this.firestore.collection('vehiculos').doc(this.vehiculoId).set({
            color: this.vehiculoColor,
            modelo: this.vehiculoModelo,
            placa: this.vehiculoPlaca,
            capacidad: this.vehiculoCapacidad,
            propietario: `/user/${userId}`,
          });
        }
      }

      loading.dismiss();
      this.showAlert('Éxito', 'Usuario registrado exitosamente.');
      this.navCtrl.navigateRoot('/login');
    } catch (error: any) {
      loading.dismiss();
      this.showAlert('Error', error.message || 'No se pudo registrar el usuario.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
=======
export class RegisterPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor() { }

  ngOnInit() {
  }

  registrar(){
    
  }

>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd
}
