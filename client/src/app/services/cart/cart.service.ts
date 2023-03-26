import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/config';
import { Cart } from 'src/app/interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  updateCart(updatedCart: Cart): Observable<Cart> {
    return this.http.put<Cart>(baseUrl, updatedCart, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(baseUrl, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(baseUrl, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
