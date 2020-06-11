import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  owlcarousel = [
    {
      desc: "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth,",
      img: "assets/images/dashboard/boy-2.png",
      name: "Mark Jenco",
      designation: "CEO & Founder At Company"
    },
    {
      desc: "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth Lorem Ipsum is simply dummy text",
      img: "assets/images/dashboard/boy-2.png",
      name: "Mark Jenco",
      designation: "CEO & Founder At Company"
    }
  ]
  owlcarouselOptions = {
    items: 1,
    margin: 30,
    pagination: false,
    navigationText: false,
    nav: false,
    loop: true,
    dots: false
  };


  // Simple line chart
  salesChart: Chart = {
    type: 'Line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    },
    options: {
      height: 475,
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    },
  };

  // Widget Bar Chart
  WidgetBarChart: Chart = {
    type: 'Bar',
    data: {
      series: [
        [5, 10, 9, 2, 4, 9, 5, 7, 5, 6, 6]
      ]
    },
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 0,
        showLabel: false,
        offset: 0,
      },
      chartPadding: {
        bottom: 0
      },
      showArea: true,
      fullWidth: true,
      height: 100
    },
  };



}
