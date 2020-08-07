import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { ProductoComponent } from './producto.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PedidosSistemaComponent } from './pedidos-sistema/pedidos-sistema.component';
import { ModalDetallePedidoSistemaComponent } from './modal-detalle-pedido-sistema/modal-detalle-pedido-sistema.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BarraNavegacionComponent,ProductoComponent, PedidosSistemaComponent, ModalDetallePedidoSistemaComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgxDropzoneModule,
    Ng2SmartTableModule 
  ]
})
export class ProductoModule { }
