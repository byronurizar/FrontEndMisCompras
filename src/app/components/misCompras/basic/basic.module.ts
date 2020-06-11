import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasicRoutingModule } from './basic-routing.module';
import { RegCataloComponent } from './reg-catalo/reg-catalo.component';
import { GsCategoriaComponent } from './gs-categoria/gs-categoria.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GsEstadoComponent } from './gs-estado/gs-estado.component';
import { GsGeneroComponent } from './gs-genero/gs-genero.component';
import { GsDepartamentoComponent } from './gs-departamento/gs-departamento.component';
import { GsMunicipioComponent } from './gs-municipio/gs-municipio.component';
import { GsRolComponent } from './gs-rol/gs-rol.component';
import { GsProveedorComponent } from './gs-proveedor/gs-proveedor.component';
import { GsTelefonoProveedorComponent } from './gs-telefono-proveedor/gs-telefono-proveedor.component';
import { GsEtiquetaComponent } from './gs-etiqueta/gs-etiqueta.component';
import { GsTallasComponent } from './gs-tallas/gs-tallas.component';
import { GsColoresComponent } from './gs-colores/gs-colores.component';
import { GsCatalogoComponent } from './gs-catalogo/gs-catalogo.component';
import { GsEstadoPedidoComponent } from './gs-estado-pedido/gs-estado-pedido.component';
import { GsTipoPagoComponent } from './gs-tipo-pago/gs-tipo-pago.component';
import { GsDetalleTipoPagoComponent } from './gs-detalle-tipo-pago/gs-detalle-tipo-pago.component';

@NgModule({
  declarations: [RegCataloComponent, GsCategoriaComponent, GsEstadoComponent, GsGeneroComponent, GsDepartamentoComponent, GsMunicipioComponent, GsRolComponent, GsProveedorComponent, GsTelefonoProveedorComponent, GsEtiquetaComponent, GsTallasComponent, GsColoresComponent, GsCatalogoComponent, GsEstadoPedidoComponent, GsTipoPagoComponent, GsDetalleTipoPagoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasicRoutingModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class BasicModule { }

