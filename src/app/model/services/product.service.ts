import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Iproduct } from './iproduct';
import { localProducts } from '../data/mock-products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/product'; // URL da API Spring Boot

  products: Iproduct[] = localProducts;

  constructor(private http: HttpClient) { }

  // Método para obter todos os produtos da API
  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      // Em caso de erro, usa o array local
      catchError(error => {
        console.error('Erro ao buscar produtos da API, usando produtos locais:', error);
        return of(this.products); // Retorna o array local como Observable
      })
    );
  }
}
