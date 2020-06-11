import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GsCategoriaComponent } from './gs-categoria/gs-categoria.component';
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
const routes: Routes = [{
  path:'',
  children:[
    {
      path:"gscategoria",
      component:GsCategoriaComponent
    },
    {
      path:"gsestado",
      component:GsEstadoComponent
    },
    {
      path:'gsgeneros',
      component:GsGeneroComponent
    },
    {
      path:'gsdepartamentos',
      component:GsDepartamentoComponent
    },
    {
      path:'gsmunicipios',
      component:GsMunicipioComponent
    },
    {
      path:'gsroles',
      component:GsRolComponent
    },
    {
      path:'gsproveedor',
      component:GsProveedorComponent
    },
    {
      path:'gstelefonosproveedores',
      component:GsTelefonoProveedorComponent
    },
    {
      path:'gsetiquetas',
      component:GsEtiquetaComponent
    },
    {
      path:'gstallas',
      component:GsTallasComponent
    },
    {
      path:'gscolores',
      component:GsColoresComponent
    },
    {
      path:'gscatalogos',
      component:GsCatalogoComponent
    },
    {
      path:'gsestadopedido',
      component:GsEstadoPedidoComponent
    },{
      path:'gstipopago',
      component:GsTipoPagoComponent
    },
    {
      path:'gsdetalletipopago',
      component:GsDetalleTipoPagoComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
