import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../interfaces/product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  public url: string = "http://localhost:8080/categories";

  constructor(private http: HttpClient) { }

  findCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.url);
  }

  findActives(): Observable<ProductCategory[]> { 
    const localUrl: string = `${this.url}/actives`;
    return this.http.get<ProductCategory[]>(localUrl);
  }

  findCategoryById(x: number): Observable<ProductCategory> { 
    const localUrl: string = `${this.url}/${x}`;
    return this.http.get<ProductCategory>(localUrl);
  }

  saveCategory(x: ProductCategory): Observable<boolean> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<boolean>(this.url, x, config);
  }

  saveCategoryReturn(x: ProductCategory): Observable<ProductCategory> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const localUrl = `${this.url}/return`
    return this.http.post<ProductCategory>(localUrl, x, config);
  }

  updateCategory(x: ProductCategory): Observable<boolean> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put<boolean>(this.url, x, config);
  }

  deleteCategory(x: number): Observable<boolean> {
    const localUrl: string = `${this.url}/${x}`;
    return this.http.delete<boolean>(localUrl);
  }

  deactivateCategory(x: number): Observable<void> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const localUrl: string = `${this.url}/deactivate`;
    return this.http.put<void>(localUrl, x, config);
  }

  activateCategory(x: number): Observable<void> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const localUrl: string = `${this.url}/activate`;
    return this.http.put<void>(localUrl, x, config);
  }
}
