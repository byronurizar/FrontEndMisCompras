import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as chartData from '../../../shared/data/deshboard/ecommerce';


@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ECommerceComponent implements OnInit {
  constructor() { }

 
  public chart1 = chartData.chart1;
  public WidgetLineChart1 = chartData.WidgetLineChart1;
  public WidgetLineChart2 = chartData.WidgetLineChart2;
  public overAllChart = chartData.overAllChart;

  ngOnInit() { }

}
