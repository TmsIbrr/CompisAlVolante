import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(private navCtrl: NavController, private animationCtrl : AnimationController) { }

  emailGuardado: string = "admin@duoc.cl";
  passwordGuardado: string = "12345";
  async login(){
    if(this.email === this.emailGuardado && this.password === this.passwordGuardado){
      this.animacionLogin();
      await this.delay(2000);
      this.navCtrl.navigateRoot('/home');
    } else {
      alert("Email o contraseña incorrectos");
    }
  }

  ngOnInit() {
  }
  animacionLogin(){
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
  registrar(){
    this.navCtrl.navigateRoot('/register');
  }
}
