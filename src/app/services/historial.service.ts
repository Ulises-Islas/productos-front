import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historical } from '../interfaces/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private url: string = "http://localhost:8080/historical";

  constructor(private http: HttpClient) { }

  findHistorical(): Observable<Historical[]> {
    return this.http.get<Historical[]>(this.url);
  }
}
