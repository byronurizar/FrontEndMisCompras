import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComercioRoutingModule } from './comercio-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { VistaRapidaComponent } from './vista-rapida/vista-rapida.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPrintModule } from 'ngx-print';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarritoComponent } from './carrito/carrito.component';
import { ModalTallasComponent } from './modal-tallas/modal-tallas.component';
import { ModalColoresComponent } from './modal-colores/modal-colores.component';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { FinalizarPedidoComponent } from './finalizar-pedido/finalizar-pedido.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';

@NgModule({
  declarations: [ProductosComponent, VistaRapidaComponent, DetalleProductoComponent, CarritoComponent, ModalTallasComponent, ModalColoresComponent, ListaDeseosComponent, FinalizarPedidoComponent, DetallePedidoComponent],
  imports: [
    CommonModule,
    ComercioRoutingModule,
    CarouselModule,
    NgbModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule,
    GalleryModule.forRoot()
  ],
  providers: [NgbActiveModal]
})
export class ComercioModule { }

// exports:[ProductosComponent],