import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

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

}
