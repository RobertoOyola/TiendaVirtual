import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get('Json/productos.json');
  }

  getCart(): any[] {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  saveCart(cart: any[]): void {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(productId: number): void {
    const cart = this.getCart();
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    sessionStorage.removeItem('cart');
  }
}
