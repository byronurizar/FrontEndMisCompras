import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { BusinessComponent } from './business/business.component';
import { CrmComponent } from './crm/crm.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent
      },
      {
        path: 'ecommerce',
        component: ECommerceComponent
      },
      {
        path: 'business',
        component: BusinessComponent
      },
      {
        path: 'crm',
        component: CrmComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
