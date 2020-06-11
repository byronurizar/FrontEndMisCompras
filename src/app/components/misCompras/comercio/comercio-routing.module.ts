import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { FinalizarPedidoComponent } from './finalizar-pedido/finalizar-pedido.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';


const routes: Routes = [{
  path:'',
  children:[{
    path:'productos',
    component:ProductosComponent
  },
{
  path:'detalle/:id',
  component:DetalleProductoComponent
},
{
  path:'carrito',
  component:CarritoComponent
},
{
  path:'listadeseos',
  component:ListaDeseosComponent
},
{
  path:'finalizarpedido',
  component:FinalizarPedidoComponent
},
{
  path:'detallepedido/:id',
  component:DetallePedidoComponent
}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComercioRoutingModule { }
