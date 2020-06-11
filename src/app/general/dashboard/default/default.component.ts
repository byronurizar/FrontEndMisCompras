import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as chartData from '../../../shared/data/deshboard/default';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  public owlcarousel = [
    {
      desc: "I  must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system,Lorem Ipsum is simply dummy text of the printing.",
      img: "assets/images/dashboard/boy-2.png",
      name: "Mark Jecno",
    },
    {
      desc: "I  must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system,Lorem Ipsum is simply dummy text of the printing.",
      img: "assets/images/dashboard/boy-2.png",
      name: "Mark Jecno",
    }
  ]
  public owlcarouselOptions = {
    loop: true,
    margin: 10,
    items: 1,
    nav: false,
    dots: false
  };


  public WidgetlineChart1 = chartData.WidgetlineChart1;
  public WidgetlineChart2 = chartData.WidgetlineChart2;
  public WidgetlineChart3 = chartData.WidgetlineChart3;
  public WidgetlineChart4 = chartData.WidgetlineChart4;
  public salesChart = chartData.salesChart;

  public monthlyChartLabels = chartData.monthlyChartLabels;
  public monthlyChartData = chartData.monthlyChartData;
  public monthlyChartColors = chartData.monthlyChartColors;
  public monthlyChartType = chartData.monthlyChartType
  public monthlyChartLegend = chartData.monthlyChartLegend
  public monthlyChartOptions = chartData.monthlyChartOptions

  public dailyChartLabels = chartData.dailyChartLabels;
  public dailyChartData = chartData.dailyChartData;
  public dailyChartColors = chartData.dailyChartColors;
  public dailyChartType = chartData.dailyChartType;
  public dailyChartLegend = chartData.dailyChartLegend;
  public dailyChartOptions = chartData.dailyChartOptions;

  public saleChartData = chartData.saleChartData;
  public saleChartLabels = chartData.saleChartLabels;
  public saleChartColors = chartData.saleChartColors;
  public saleChartLegend = chartData.saleChartLegend;
  public saleChartType = chartData.saleChartType;
  public saleChartOptions = chartData.saleChartOptions;

  ngOnInit() { }
}
