import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoutingService {
  private apiKey = '5b3ce3597851110001cf62481b9f46e8d8264c0dab647336c889643c' // Reemplaza con tu clave de API

  constructor(private http: HttpClient) {}

  getRoute(start: [number, number], end: [number, number]): Observable<any> {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;
    return this.http.get(url);
  }
}
