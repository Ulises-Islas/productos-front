import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { HistorialComponent } from './historial/historial.component';


const routes: Routes = [
  {
    path: '',
    component: HistorialComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
