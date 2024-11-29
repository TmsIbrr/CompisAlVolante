<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ViajesService } from '../services/viajes.service';
import { Viaje } from '../models/viaje.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-compis-list',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit, OnDestroy {
  viajes: any[] = [];
  viajesSubscription: Subscription | undefined;

  constructor(private viajesService: ViajesService, private router: Router) {}

  ngOnInit() {
    this.viajesService.obtenerViajes().subscribe(
      (viajes: Viaje[]) => {
        this.viajes = viajes;
      },
      (error: any) => {  // Type error as any
        console.error('Error loading viajes', error);
      }
    );
  }

  ngOnDestroy() {
   
    if (this.viajesSubscription) {
      this.viajesSubscription.unsubscribe();
    }
  }

  
  loadViajesInRealTime() {
    this.viajesSubscription = this.viajesService.getViajesObservable().subscribe(
      data => {
        this.viajes = data;
        console.log('Viajes actualizados en tiempo real:', this.viajes);
      },
      error => {
        console.error("Error al cargar viajes en tiempo real:", error);
      }
    );
  }

  async updateViaje(viaje: any) {
    const viajeId = viaje.id;  
    if (viajeId) {
      this.router.navigate(['/edit', viajeId]);
    } else {
      console.log("Error: el compi no tiene ID.");
    }
  }

  async deleteCompi(viajeId: string) {
    console.log('ID del viaje a eliminar:', viajeId);  // Verifica si el ID es correcto
    await this.viajesService.deleteViaje(viajeId);
    this.loadViajesInRealTime(); 
  }
  

  
  toggleLike(index: number) {
    this.viajes[index].liked = !this.viajes[index].liked;
  }

  
  irADetallesViaje(viajeId: string) {
    this.router.navigate(['/unirse-viaje', viajeId]);
  }
}





=======
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  liked: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  toggleLike(){
    this.liked = !this.liked;
  }
}
>>>>>>> 6137038780b8e8587796cb39d1a036ef6c2d79fd
