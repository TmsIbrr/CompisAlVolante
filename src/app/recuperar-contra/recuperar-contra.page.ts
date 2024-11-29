import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {

  email: string = "";
  errorMessage: string = "";  
  successMessage: string = "";  

  constructor(
    private afAuth: AngularFireAuth, 
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  async resetPassword() {
    if (!this.validateEmail(this.email)) {
      this.errorMessage = "Por favor, ingresa un correo electrónico válido.";
      this.successMessage = "";
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.successMessage = "Se ha enviado un enlace de recuperación a tu correo.";
      this.errorMessage = "";
    } catch (error: any) {
      console.error('Error al enviar enlace de recuperación:', error);
      this.errorMessage = this.getFirebaseErrorMessage(error.code);
      this.successMessage = "";
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No se encontró un usuario con este email.';
      case 'auth/invalid-email':
        return 'El email no es válido.';
      default:
        return 'Ocurrió un error al enviar el enlace. Inténtalo de nuevo.';
    }
  }
}
