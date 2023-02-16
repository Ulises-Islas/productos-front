import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "http://localhost:8080/products";

  constructor(private http: HttpClient) { }

  findProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  findProductById(x: number): Observable<Product> {
    const localUrl: string = `${this.url}/${x}`;
    return this.http.get<Product>(localUrl);
  }

  findProductsByCategory(x: number): Observable<Product[]> {
    const localUrl: string = `${this.url}/category/${x}`;
    return this.http.get<Product[]>(localUrl);
  }

  saveProduct(x: Product): Observable<boolean> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<boolean>(this.url, x, config);
  }

  updateProduct(x: Product): Observable<boolean> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put<boolean>(this.url, x, config);
  }

  deleteProduct(x: number): Observable<boolean> {
    const localUrl: string = `${this.url}/${x}`;
    return this.http.delete<boolean>(localUrl);
  }

  deactivateProduct(x: number): Observable<void> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const localUrl: string = `${this.url}/deactivate`;
    return this.http.put<void>(localUrl, x, config);
  }

  activateProduct(x: number): Observable<void> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const localUrl: string = `${this.url}/activate`;
    return this.http.put<void>(localUrl, x, config);
  }

}
