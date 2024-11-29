export class Compi {
    id: string;
    nombre: string;
    inicio: string;
    hasta: string;
  
    constructor(id: string, nombre: string, inicio: string, hasta: string) {
      this.id = id;
      this.nombre = nombre;
      this.inicio = inicio;
      this.hasta = hasta;
    }
  }

export interface Compi {
    id: string;
    nombre: string;
    inicio: string;
    hasta: string;
  }
  