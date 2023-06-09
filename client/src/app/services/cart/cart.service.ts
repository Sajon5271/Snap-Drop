import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart.interface';
import { baseBackendURL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = `${baseBackendURL}/cart`;
  // private baseUrl = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) {}

  updateCart(updatedCart: Cart): Observable<Cart> {
    return this.http.put<Cart>(this.baseUrl, updatedCart, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
