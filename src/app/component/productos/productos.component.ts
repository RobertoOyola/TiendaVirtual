import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

declare var bootstrap: any;

@Component({
  selector: 'app-productos',
  standalone: false,
  
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  categorias: any[] = [];

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.categorias = data;
    });
  }

  addToCart(productId: number): void {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const productInCart = cart.find((item: any) => item.id === productId);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Producto con id ${productId} añadido al carrito.`, cart);

    this.showToast();
  }
  

  showToast(): void {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }


}
