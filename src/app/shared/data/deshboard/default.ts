import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';


export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

// Widget Line Chart
export var WidgetlineChart1: Chart = {
    type: 'Line', 
    data: {
	  series: [
        [25, 50, 30, 40, 60, 21, 20, 10, 4, 13,0, 10, 30, 40, 10, 15, 20]
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
            right: 0,
            left: 0,
            bottom: 0,
          },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        showArea: true,
        fullWidth: true,
        height:60,
        showPoint: false,
    },
  };
  
  // Widget Line Chart
  export var WidgetlineChart2: Chart = {
    type: 'Line', 
    data: {
	    series: [
	      [null],
	      [5, 10, 20, 14, 17, 21, 20, 10, 4, 13,0, 10, 30, 40, 10, 15, 20]
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
            right: 0,
            left: 0,
            bottom: 0,
          },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        showArea: true,
        fullWidth: true,
        height:60,
        showPoint: false,
    },
  };

  // Widget Line Chart
  export var  WidgetlineChart3: Chart = {
    type: 'Line', 
    data: {
    series: [
	      [null],
	      [null],
	      [5, 10, 20, 14, 17, 21, 20, 10, 4, 13,0, 10, 30, 40, 10, 15, 20]
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
            right: 0,
            left: 0,
            bottom: 0,
          },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        showArea: true,
        fullWidth: true,
        height:60,
        showPoint: false,
    },
 };
 
 // Widget Line Chart
 export var WidgetlineChart4: Chart = {
    type: 'Line', 
    data: {
        series: [
          [null],
          [null],
          [null],
          [5, 10, 20, 14, 17, 21, 20, 10, 4, 13,0, 10, 30, 40, 10, 15, 20]
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
            right: 0,
            left: 0,
            bottom: 0,
        },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        showArea: true,
        fullWidth: true,
        height:60,
        showPoint: false,
    }
 };
 
 // Sales Chart
 export var salesChart: Chart = {
	type: 'Line', 
	data: {
	    series: [
	      [4, 6, 8, 6, 8, 30, 25, 24, 27, 8, 18, 12, 8, 40, 33, 37, 25, 22, 18, 25, 2, 4, 15, 10, 11, 15, 1],
	      [24, 27, 8, 18, 12, 8, 40, 33, 37, 25, 22, 18, 25, 2, 4, 15, 10, 11, 15, 14, 6, 8, 6, 8, 30, 25],
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
	        top: 30,
            bottom: 0,
            right: 0,
            left: 0,
	    },
	    lineSmooth: Chartist.Interpolation.cardinal({
	        tension: 0
	    }),
	    showArea: true,
	    fullWidth: true,
	    height:320,
	    showPoint: false,
	}
};
  
  
  // Doughnut Chart (Monthlt visitor chart)
  export var monthlyChartLabels: string[] = ['India', 'USA', 'Canada', 'UK'];
  export var monthlyChartData: number[] = [500, 600, 400, 700];
  export var monthlyChartColors: any[] = [{ backgroundColor: ["#ccbbef", "#80dde9", "#68dabe", "#4099ffa3"] }];
  export var monthlyChartType = 'doughnut';
  export var monthlyChartLegend = true;
  export var monthlyChartOptions : any = {
	  animation: false,
	  responsive: true,
	  height: 500,
	  maintainAspectRatio: false,
	  legend: {position: 'right'}
  };

  // Doughnut Chart (Daily visitor chart)
  export var dailyChartLabels: string[] = ['India', 'USA', 'Canada', 'UK'];
  export var dailyChartData: number[] = [800, 500, 200, 300];
  export var dailyChartColors: any[] = [{ backgroundColor: ["#ccbbef", "#80dde9", "#68dabe", "#4099ffa3"] }];
  export var dailyChartType = 'doughnut';
  export var dailyChartLegend = true;
  export var dailyChartOptions : any = {
	  animation: false,
	  responsive: true,
	  height: 500,
	  maintainAspectRatio: false,
	  legend: {position: 'right'}
  };


  // LineChart (Top Sale)
  export var saleChartData: Array<any> = [
	  { data: [10, 20, 40, 30, 0, 20, 10, 30, 10] },
	  { data: [20, 40, 10, 20, 40, 30, 40, 10, 20] },
	  { data: [60, 10, 40, 30, 80, 30, 20, 90] }
  ];
  export var saleChartLabels: Array<any> = ["","10", "20", "30", "40", "50", "60", "70", "80"];
  export var saleChartColors: Array<any> = [
	  {
	    backgroundColor: 'rgba(171, 140, 228, 0.2)',
	    borderColor: "#ab8ce4",
	    borderWidth: 2,
	    lineTension: 0,
	  },
	  {
	    backgroundColor: 'rgba(38, 198, 218, 0.2)',
	    borderColor: "#26c6da",
	    borderWidth: 2,
	    lineTension: 0,
	  },
	  {
	    backgroundColor: 'rgb(64, 153, 255, 0.2)',
	    borderColor: "#4099ff",
	    borderWidth: 2,
	    lineTension: 0,
	  }
  ];
  export var saleChartLegend = false;
  export var saleChartType  = 'line';
  export var saleChartOptions: any = {
    responsive: true,
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
  };
  
