import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-carrito',
  standalone: false,
  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  /**
   * Cargar los productos del carrito desde Session Storage y el JSON.
   */
  loadCart(): void {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]') as { id: number; quantity: number }[];

    this.productosService.getProductos().subscribe((productos: any[]) => {
      const allProducts = productos.flatMap((categoria: any) =>
        categoria.subcategorias.flatMap((subcat: any) => subcat.productos)
      );

      this.cartItems = cart.map((item: { id: number; quantity: number }) => {
        const product = allProducts.find((p: { id: number }) => p.id === item.id);
        if (product) {
          return {
            ...product,
            quantity: item.quantity,
            total: product.precio * item.quantity
          };
        }
        return null;
      }).filter((item): item is any => item !== null); // Filtrar productos nulos (si algún ID no existe)

      this.calculateTotal();
    });
  }

  /**
   * Calcular el total del carrito.
   */
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum: number, item: any) => sum + item.total, 0);
  }

  /**
   * Vaciar el carrito y limpiar los datos del Session Storage.
   */
  clearCart(): void {
    sessionStorage.removeItem('cart');
    this.cartItems = [];
    this.total = 0;
  }

  /**
   * Eliminar un producto específico del carrito.
   * @param productId - ID del producto a eliminar.
   */
  removeItem(productId: number): void {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]') as { id: number; quantity: number }[];
    const updatedCart = cart.filter((item: { id: number }) => item.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    this.loadCart();
  }
}
