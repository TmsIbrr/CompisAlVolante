import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AnimationController } from '@ionic/angular';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    if (this.validateEmail(this.email) && this.password.length >= 5) {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
        console.log('Login exitoso:', userCredential);

        this.animacionLogin();
        await this.delay(2000);

        const token = 'tokens';
        localStorage.setItem('authToken', token);

        this.navCtrl.navigateRoot('/home');
      } catch (error: any) {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = this.getFirebaseErrorMessage(error.code);
        alert(this.errorMessage);
      } finally {
        loading.dismiss();
      }
    } else {
      loading.dismiss();
      alert("Por favor, ingrese un email válido y una contraseña de al menos 5 caracteres.");
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
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-email':
        return 'El email no es válido.';
      default:
        return 'Ocurrió un error desconocido. Inténtalo de nuevo.';
    }
  }

  animacionLogin() {
    const button = document.querySelector('.login-button');
    if (button) {
      const buttonAnimation = this.animationCtrl.create()
        .addElement(button)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'scale(1)', 'scale(1.2)')
        .fromTo('opacity', '1', '0.5');

      buttonAnimation.play();
    } else {
      console.error('Elemento .login-button no encontrado');
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  goToRecuperarContra() {
    this.navCtrl.navigateForward('/recuperar-contra');
  }

  registrar() {
    this.navCtrl.navigateRoot('/register');
  }
}
