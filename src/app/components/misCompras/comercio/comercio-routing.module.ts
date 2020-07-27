import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { FinalizarPedidoComponent } from './finalizar-pedido/finalizar-pedido.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { MisdireccionesComponent } from './misdirecciones/misdirecciones.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'productos',
      redirectTo: 'productos/0/0'
    },
    {
      path: 'productos/:idCatalogo/:idCategoria',
      component: ProductosComponent
    },
    {
      path: 'detalle/:id',
      component: DetalleProductoComponent
    },
    {
      path: 'carrito',
      component: CarritoComponent
    },
    {
      path: 'listadeseos',
      component: ListaDeseosComponent
    },
    {
      path: 'finalizarpedido',
      component: FinalizarPedidoComponent
    },
    {
      path: 'detallepedido/:id',
      component: DetallePedidoComponent
    },
    {
      path: 'direcciones',
      component: MisdireccionesComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComercioRoutingModule { }
