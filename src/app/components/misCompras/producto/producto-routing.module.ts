import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { PedidosSistemaComponent } from './pedidos-sistema/pedidos-sistema.component';
import { InfoAdicionalComponent } from './info-adicional/info-adicional.component';



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
    {
      path: 'infoadicional',
      component:InfoAdicionalComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
