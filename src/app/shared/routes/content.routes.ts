import { Routes, RouterModule } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../general/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'basic',
    loadChildren: () => import('../../components/misCompras/basic/basic.module').then(m => m.BasicModule),
  },{
    path:'producto',
    loadChildren:() => import('../../components/misCompras/producto/producto.module').then(m=>m.ProductoModule),
  },
  {
    path:'dashboard',
    loadChildren:() => import('../../components/misCompras/dashboard/dashboard.module').then(m=>m.DashboardModule),
  },
  {
    path:'comercio',
    loadChildren:() => import('../../components/misCompras/comercio/comercio.module').then(m=>m.ComercioModule),
  }
];
