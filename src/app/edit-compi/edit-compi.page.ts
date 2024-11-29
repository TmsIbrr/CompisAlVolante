import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajesService } from '../services/viajes.service';
import { Viaje } from '../models/viaje.model'; 
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-edit-compi',
  templateUrl: './edit-compi.page.html',
  styleUrls: ['./edit-compi.page.scss'],
})
export class EditCompiPage implements OnInit {
  nombre: string = ''; // Nombre del viaje
  conductorId: string = ''; // ID del conductor
  asientosDisponibles: number = 0; // Cantidad de asientos disponibles
  costoPorPasajeros: number = 0; // Costo por pasajero
  salida: string = ''; // Fecha de salida
  liked: boolean = false; // Estado del like
  
  
  private map!: L.Map; // Mapa de Leaflet
  startLocation: string = ""; // Ubicación de inicio
  endLocation: string = ""; // Ubicación de destino
  startMarker!: L.Marker; // Marcador de inicio
  endMarker!: L.Marker; // Marcador de destino
  routeLayer!: L.LayerGroup; // Capa de la ruta
  private apiKey: string = "pk.999ac545e24c688184ea3888b0ea947d"; // API Key para LocationIQ

  viajeId: string | null = null;
  viaje: Viaje = { // Objeto de viaje
    id: '',
    nombre: '',
    asientosDisponibles: 0,
    conductorId: '1',
    costoPorPasajeros: 0,
    creadoEn: new Date(),
    endLocation: '',
    estado: 'Activo',
    startLocation: '',
    salida: new Date(),
    liked: false
  };

  constructor(
    private route: ActivatedRoute,
    private viajesService: ViajesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viajeId = this.route.snapshot.paramMap.get('id');
    
    if (this.viajeId) {
      this.loadCompiData();
    }
    this.cargarMapa(); // Cargar el mapa al iniciar
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize(); // Asegurarse de que el mapa se ajuste correctamente
      }
    }, 500);
  }

  cargarMapa() {
    // Inicialización del mapa
    this.map = L.map('map', {
      zoom: 13,
      zoomControl: false
    });

    // Configuración de la capa del mapa con LocationIQ
    L.tileLayer(`https://tiles.locationiq.com/v2/obk/r/{z}/{x}/{y}.png?key=${this.apiKey}`, {
      attribution: '&copy; <a href="https://locationiq.com/">LocationIQ</a> contributors'
    }).addTo(this.map);

    // Localización del usuario
    this.map.locate({ setView: true, maxZoom: 16 });

    // Evento cuando la ubicación es encontrada
    this.map.on('locationfound', (e: L.LocationEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.startLocation = `${lat}, ${lng}`; // Actualizar ubicación de inicio
      if (this.startMarker) {
        this.map.removeLayer(this.startMarker); // Remover marcador anterior
      }
      this.startMarker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup('Tu estás aquí') // Mostrar mensaje en el marcador
        .openPopup();
    });

    // Evento cuando la ubicación no es encontrada
    this.map.on('locationerror', (e: L.ErrorEvent) => {
      console.error('Error obteniendo la ubicación', e.message);
      this.map.setView([51.505, -0.09], 13); // Mostrar ubicación predeterminada si falla
    });

    // Inicializar la capa de la ruta
    this.routeLayer = L.layerGroup().addTo(this.map);
  }

  async updateMap() {
    // Actualizar el mapa con la nueva ubicación de inicio
    const startCoords = await this.geocodeLocation(this.startLocation);
    if (startCoords) {
      const [startLat, startLng] = startCoords;
      if (this.map) {
        this.map.setView([startLat, startLng], 13);
        if (this.startMarker) {
          this.map.removeLayer(this.startMarker);
        }
        this.startMarker = L.marker([startLat, startLng]).addTo(this.map)
          .bindPopup('Inicio')
          .openPopup();
      }
    }

    // Actualizar el mapa con la nueva ubicación de destino
    const endCoords = await this.geocodeLocation(this.endLocation);
    if (endCoords) {
      const [endLat, endLng] = endCoords;
      if (this.map) {
        this.map.setView([endLat, endLng], 13);
        if (this.endMarker) {
          this.map.removeLayer(this.endMarker);
        }
        this.endMarker = L.marker([endLat, endLng]).addTo(this.map)
          .bindPopup('Destino')
          .openPopup();
      }

      // Obtener y mostrar la ruta entre el inicio y el destino
      if (startCoords && endCoords) {
        this.getRoute(startCoords, endCoords);
      }
    }
  }

  // Función para geocodificar una ubicación (convertir nombre a coordenadas)
  async geocodeLocation(location: string): Promise<[number, number] | null> {
    const url = `https://us1.locationiq.com/v1/search.php?key=${this.apiKey}&q=${encodeURIComponent(location)}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        return [lat, lng];
      }
    } catch (error) {
      console.error('Error en la geocodificación', error);
    }
    return null;
  }

  // Función para obtener la ruta entre dos ubicaciones
  async getRoute(startCoords: [number, number], endCoords: [number, number]) {
    const url = `https://us1.locationiq.com/v1/directions/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?key=${this.apiKey}&overview=full&geometries=geojson`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;
        const latlngs = route.map((coord: [number, number]) => [coord[1], coord[0]] as [number, number]);
        if (this.routeLayer) {
          this.routeLayer.clearLayers(); // Limpiar capa de ruta
        }
        L.polyline(latlngs, { color: 'blue' }).addTo(this.routeLayer); // Mostrar ruta en el mapa
      }
    } catch (error) {
      console.error('Error obteniendo la ruta', error);
    }
  }



  loadCompiData() {
    if (this.viajeId) {
      this.viajesService.getViajeById(this.viajeId)
        .then((viajeData) => {
          if (viajeData) {
            this.viaje = viajeData;
          }
        })
        .catch((error) => {
          console.error('Error obteniendo viaje:', error);
        });
    }
  }
  

  async updateCompi() {
    if (this.viaje.id) {
      try {
        await this.viajesService.updateViaje(this.viaje.id, {
          nombre: this.viaje.nombre,
          asientosDisponibles: this.asientosDisponibles,
          conductorId: this.conductorId,
          endLocation: this.viaje.endLocation,
          startLocation: this.viaje.startLocation,
          salida: this.salida
        });
        this.router.navigate(['/home']);
      } catch (error) {
        console.error("Error actualizando compi:", error);
      }
    }
  }
}



