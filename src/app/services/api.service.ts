import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/GetCategories`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/GetCategory/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  addCategory(reqBody: Category): Observable<Category> {
    return this.http
      .post<Category>(`${this.baseUrl}/AddCategory`, reqBody)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteCategory?id=${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  updateCategory(id: number, reqBody: Category): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateCategory/${id}`, reqBody).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/GetProducts`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/GetProduct/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  addProduct(reqBody: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/AddProduct`, reqBody).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteProduct/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  updateProduct(id: number, reqBody: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateProduct/${id}`, reqBody).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
