import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductosComponent } from './component/productos/productos.component';
import { CarritoComponent } from './component/carrito/carrito.component';

const routes: Routes = [
  {path: '',                component: HomeComponent},
  {path: 'home',            component: HomeComponent},
  {path: 'producto',        component: ProductosComponent},
  {path: 'carrito',         component: CarritoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
