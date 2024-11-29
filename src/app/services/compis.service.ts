import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Viaje } from '../models/viaje.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompisService {
  private compisCollection = collection(db, 'compis');

  constructor(private firestore: AngularFirestore) {}

  async addCompi(compiData: any) {
    try {
      const docRef = await addDoc(this.compisCollection, compiData);
      return docRef.id;
    } catch (error) {
      console.error("Error añadiendo al Compi: ", error);
      throw error;
    }
  }

  getCompisObservable(): Observable<any[]> {
    return new Observable((observer) => {
      onSnapshot(this.compisCollection, (snapshot) => {
        const compis = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        observer.next(compis);
      }, (error) => {
        observer.error(error);
      });
    });
  }

  async getCompis() {
    try {
      const querySnapshot = await getDocs(this.compisCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo compis: ", error);
      throw error;
    }
  }

  async deleteCompi(id: string) {
    const compiRef = doc(this.compisCollection, id);
    try {
      await deleteDoc(compiRef);
      console.log("Compi eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando el Compi: ", error);
      throw error;
    }
  }

  async getCompiById(id: string) {
    const compiRef = doc(db, 'compis', id);
    try {
      const docSnap = await getDoc(compiRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error("Error obteniendo el compi: ", error);
      throw error;
    }
  }

  async updateCompi(id: string, compiData: any) {
    const compiRef = doc(db, 'compis', id);
    try {
      await updateDoc(compiRef, compiData);
      console.log('Compi actualizado');
    } catch (error) {
      console.error("Error actualizando el compi: ", error);
      throw error;
    }
  }


  
}







