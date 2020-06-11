import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as chartData from '../../../shared/data/deshboard/crm';


@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrmComponent implements OnInit {

  constructor() { }

  public salesChart = chartData.salesChart;
  public vendorChart = chartData.vendorChart;
  public comboChart = chartData.comboChart;

  ngOnInit() {
  }
}
