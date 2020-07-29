import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { PedidosSistemaComponent } from './pedidos-sistema/pedidos-sistema.component';



const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'nuevo',
      component:ProductoComponent
    },
    {
      path: 'pedidos',
      component:PedidosSistemaComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
