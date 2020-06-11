import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

  // Stacked bar chart
export var  salesChart: Chart = {
    type: 'Bar',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q13', 'Q14'],
          series: [
              [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300],
              [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300],
              [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300]
          ]
     },
     options: {
       stackBars: true,
         axisY: {
            labelInterpolationFnc: function(value) {
                  return (value / 1000) + 'k';
            }
        },
        height:300,
     }
};

// Simple line chart
export var vendorChart: Chart = {
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
      height:300,
      fullWidth: true,
        chartPadding: {
               right: 40
          }
   },
};

// Combo Chart
export var comboChart: Chart = {
    type: 'Bar',
    data: {
        labels: ['2010-11', '2011-12', '2012-13', '2013-13', '2014-15', '2015-16', '2016-17', '2017-18'],
        series: [
          [0.9, 0.4, 1.5, 4.9, 3, 3.8, 3.8, 1.9],
          [6.4, 5.7, 7, 4.95, 3, 3.8, 3.8, 1.9],
          [4.3, 2.3, 3.6, 4.5, 5, 2.8, 3.3, 4.3],
          [3.8, 4.1, 2.8, 1.8, 2.2, 1.9, 6.7, 2.9]
        ]
    },
    options: {
        height:370,
        seriesBarDistance: 15,
        horizontalBars: false,
        axisY: {
          offset: 20
        }
    },
};
