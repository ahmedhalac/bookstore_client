import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment.development';

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
}
