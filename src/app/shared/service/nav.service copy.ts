import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  children?: Menu[];
}

// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class NavService {
  public screenWidth: any;
  public openToggle: boolean = false;

  constructor() {
    this.onResize();
    if (this.screenWidth < 1199) {
      this.openToggle = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      headTitle: 'Basico'
    },
    {
      title: 'Mantenimientos', icon: 'icon-desktop', type: 'sub', active: false, children: [
        { path: '/basic/gscategoria', title: 'Gestión Categoria', type: 'link' },
        { path: '/basic/gsestado', title: 'Gestión Estado', type: 'link' },
        { path: '/basic/gsgeneros', title: 'Gestión Genero', type: 'link' },
        { path: '/basic/gsdepartamentos', title: 'Gestión Departamento', type: 'link' },
        { path: '/basic/gsmunicipios', title: 'Gestión Municipio', type: 'link' },
        { path: '/basic/gsroles', title: 'Gestión Roles', type: 'link' },
        { path: '/basic/gsproveedor', title: 'Gestión Proveedores', type: 'link' },
        { path: '/basic/gstelefonosproveedores', title: 'Gestión Teléfonos Proveedores', type: 'link' },
        { path: '/basic/gsetiquetas', title: 'Gestión Etiquetas de Productos', type: 'link' },
        { path: '/basic/gstallas', title: 'Gestión Tallas de Productos', type: 'link' },
        { path: '/basic/gscolores', title: 'Gestión Colores de Productos', type: 'link' },
        { path: '/basic/gscatalogos', title: 'Gestión Catálogos', type: 'link' },
        { path: '/basic/gsestadopedido', title: 'Gestión Estados de Pedido', type: 'link' },
        { path: '/basic/gstipopago', title: 'Gestión Tipos de Pago', type: 'link' },
        { path: '/basic/gsdetalletipopago', title: 'Gestión Detalle Tipos de Pago', type: 'link' }
      ]
    }, {
      title: 'Producto', icon: 'icon-desktop', type: 'sub', active: false, children: [
        {
          path: '/producto', title: 'Registrar', type: 'link'
        }
      ]
    },
    {
      title: 'Comercio', icon: 'icon-desktop', type: 'sub', active: false, children: [
        {
          path: '/comercio/productos', title: 'Productos', type: 'link'
        },
        {
          path: '/comercio/carrito', title: 'Mi Carrito', type: 'link'
        },
        {
          path: '/comercio/listadeseos', title: 'Lista de deseos', type: 'link'
        },
        {
          path: '/comercio/detallepedido/54', title: 'Detalle de pedido', type: 'link'
        }
      ]
    },
    {
      headTitle: 'GENERAL'
    },
    {
      title: 'Dashboard', icon: 'icon-desktop', type: 'sub', active: false, children: [
        { path: '/dashboard/default', title: 'Default', type: 'link' },
        { path: '/dashboard/ecommerce', title: 'E-Commerce', type: 'link', badgeType: 'danger', badgeValue: 'Hot' },
        { path: '/dashboard/business', title: 'Business', type: 'link' },
        { path: '/dashboard/crm', title: 'CRM', type: 'link' }
      ]
    }
  ]

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

}
