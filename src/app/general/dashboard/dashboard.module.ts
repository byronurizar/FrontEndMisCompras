import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ChartistModule } from 'ng-chartist';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CountToModule } from 'angular-count-to';
import { DefaultComponent } from './default/default.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { BusinessComponent } from './business/business.component';
import { CrmComponent } from './crm/crm.component';

@NgModule({
  declarations: [DefaultComponent, ECommerceComponent, BusinessComponent, CrmComponent],
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    ChartistModule,
    ChartsModule,
    CarouselModule,
    CountToModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
