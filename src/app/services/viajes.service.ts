import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  
import { Viaje } from '../models/viaje.model';  
import { db } from '../../environments/environment.prod';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, onSnapshot } from 'firebase/firestore';

import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private viajesCollection = collection(db, 'viajes');

  viajes: Viaje[] = []; 
  constructor(private angularFirestore: AngularFirestore) {}

  obtenerViajes(): Observable<Viaje[]> {
    return this.angularFirestore
      .collection('viajes')
      .snapshotChanges()
      .pipe(
        map((querySnapshot: any) => {  
          const viajes: Viaje[] = querySnapshot.map((doc: any) => {  
            const data = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              nombre: data['nombre'],
              asientosDisponibles: data['asientosDisponibles'],
              conductorId: data['conductorId'],
              costoPorPasajeros: data['costoPorPasajeros'],
              liked: data['liked'] || false,
              creadoEn: data['creadoEn'],
              endLocation: data['endLocation'],
              estado: data['estado'],
              startLocation: data['startLocation'],
              salida: data['salida'],
            } as Viaje;
          });
          return viajes;
        })
      );
  }


  getViajesObservable(): Observable<any[]> {
    return new Observable((observer) => {
      onSnapshot(this.viajesCollection, (snapshot) => {
        const viajes = snapshot.docs.map((doc) => {
          const viaje = { id: doc.id, ...doc.data() };
          console.log('Viaje con ID:', viaje); 
          return viaje;
        });
        observer.next(viajes);
      }, (error) => {
        observer.error(error);
      });
    });
  }
  
  

  async agregarViaje(viaje: Viaje) {
    try {
      const docRef = await addDoc(this.viajesCollection, {
        nombre: viaje.nombre,
        asientosDisponibles: viaje.asientosDisponibles,
        conductorId: viaje.conductorId,
        costoPorPasajeros: viaje.costoPorPasajeros,
        creadoEn: viaje.creadoEn,
        endLocation: viaje.endLocation,
        estado: viaje.estado,
        startLocation: viaje.startLocation,
        salida: viaje.salida,
      });
      console.log('Viaje agregado con ID: ', docRef.id);
    } catch (error) {
      console.error("Error agregando el viaje: ", error);
    }
  }
  

  actualizarViaje(viaje: Viaje) {
    const index = this.viajes.findIndex(v => v.id === viaje.id);
    if (index !== -1) {
      this.viajes[index] = viaje; 
    }
  }

  async deleteViaje(id: string) {
    if (!id) {
      console.error('No se proporcionó un ID válido para eliminar el viaje');
      return;  // No intentamos eliminar si no hay ID
    }
    const viajeRef = doc(this.viajesCollection, id);
    try {
      await deleteDoc(viajeRef);
      console.log("Viaje eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando el viaje:", error);
      throw error;
    }
  }
  

  async getViajeById(id: string): Promise<Viaje | null> {
    const viajeRef = doc(db, 'viajes', id);
    try {
      const docSnap = await getDoc(viajeRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Mapear los datos al modelo Viaje
        return {
          id, 
          nombre: data['nombre'] || '',
          asientosDisponibles: data['asientosDisponibles'] || 0,
          conductorId: data['conductorId'] || '',
          costoPorPasajeros: data['costoPorPasajeros'] || 0,
          creadoEn: data['creadoEn'] ? new Date(data['creadoEn'].seconds * 1000) : new Date(),
          endLocation: data['endLocation'] || '',
          estado: data['estado'] || 'Activo',
          startLocation: data['startLocation'] || '',
          salida: data['salida'] ? new Date(data['salida'].seconds * 1000) : new Date(),
          liked: data['liked'] || false,
        };
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo el viaje: ', error);
      throw error;
    }
  }
  
  

  async updateViaje(id: string, viajeData: any) {
    const viajeRef = doc(db, 'viajes', id);
    try {
      await updateDoc(viajeRef, viajeData);
      console.log('Viaje actualizado');
    } catch (error) {
      console.error("Error actualizando el viaje: ", error);
      throw error;
    }
  }
}

