export class Viaje {
  id: string;
  nombre: string;
  asientosDisponibles: number;
  conductorId: string;
  costoPorPasajeros: number;
  avatar?: string;  // Optional property
  liked?: boolean;  // Optional property
  creadoEn: Date;
  endLocation: string;
  estado: string;
  startLocation: string;
  salida: Date;

  
    constructor(id: string, nombre: string, asientosDisponibles: number, conductorId: string, costoPorPasajeros: number, creadoEn: Date, destino: string, estado: string, inicio: string, salida: Date) {
      this.id = id;
      this.nombre = nombre;
      this.asientosDisponibles = asientosDisponibles;
      this.conductorId = conductorId;
      this.costoPorPasajeros = costoPorPasajeros;
      this.creadoEn = creadoEn;
      this.endLocation = destino;
      this.estado = estado;
      this.startLocation = inicio;
      this.salida = salida;
    }
  }
  