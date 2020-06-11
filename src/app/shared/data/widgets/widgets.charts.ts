import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

export var salesWidget: Chart = {
    type: 'Line', 
    data: {
	  series: [
        [25, 50, 30, 40, 60, 80, 50, 10, 50, 13, 0, 10, 30, 40, 10, 15, 20]
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
        top: 0
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      showArea: true,
      fullWidth: true,
      height:100,
      showPoint: false,
    },
  };

  // Widget Line Chart
  export var projectWidget: Chart = {
    type: 'Line', 
    data: {
	  series: [
	      [null],
        [25, 35, 70, 100, 90, 50, 60, 80, 40, 50, 60, 40, 80, 70, 60, 50, 100]
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
            top: 0
          },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        showArea: true,
        fullWidth: true,
        height:100,
        showPoint: false,
    },
  };

  // Widget Line Chart
  export var productWidget: Chart = {
    type: 'Line', 
    data: {
	  series: [
	    [null],
        [null],
        [50, 100, 80, 60, 50, 60, 40, 80, 40, 50, 60, 40, 60, 70, 40, 50, 20]
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
            top: 0
          },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        showArea: true,
        fullWidth: true,
        height:100,
        showPoint: false,
    },
  };

  // Widget Bar Chart
  export var WidgetBarChart1: Chart = {
    type: 'Bar', 
    data: {
	  series: [
        [100.00,100.00,90.00,80.00,95.00,75,100.00,90.00,110.00,80.00,90.00,105,95,85]
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
    	  bottom: 0,
    	  top: 50,
    	  left: 30
    	},
        showArea: true,
        fullWidth: true,
        height:230
    },
  };

  // Widget Bar Chart
  export var WidgetBarChart2: Chart = {
    type: 'Bar', 
    data: {
	  series: [
	    [null],
        [90.00,110.00,80.00,90.00,105,95,85,100.00,100.00,90.00,80.00,95.00,75,100.00]
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
    	  bottom: 0,
    	  top: 50,
    	  left: 30
    	},
        showArea: true,
        fullWidth: true,
        height:230
    },
  };

  // Live Product Chart
  export var liveProductChart: Chart = {
    type: 'Line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      series: [
        [1, 5, 2, 5, 4, 3, 6],
      ]
    },
    options: {
        low: 0,
        showArea: false,
        showPoint: false,
        fullWidth: true,
        height: 300,
    },
    events : {
	    draw: (data) => {
	    	if(data.type === 'line' || data.type === 'area') {
	            data.element.animate({
	                d: {
	                    begin: 2000 * data.index,
	                    dur: 2000,
	                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
	                    to: data.path.clone().stringify(),
	                    easing: Chartist.Svg.Easing.easeOutQuint
	                }
	            });
            }
	     }
  	  }
  };

  // turn over Chart
  export var turnOverChart: Chart = {
    type: 'Bar',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      series: [
        [1.9, 4.4, 1.5, 5, 4.4, 3.4],
        [6.4, 5.7, 7, 4, 5.5, 3.5],
        [5, 2.3, 3.6, 6, 3.6, 2.3]
      ]
    },
    options: {
        height: 300,
    }
  };

  // Monthly Chart
  export var monthlyChart: Chart = {
    type: 'Bar',
    data: {
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10'],
      series: [
        [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
      ]
    },
    options: {
        height: 300,
    }
  };

  // Uses Chart
  export var usesChart: Chart = {
    type: 'Line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      series: [
        [1, 5, 2, 5, 4, 3],
        [2, 3, 4, 8, 1, 2],
        [5, 4, 3, 2, 1, 0.5]
      ]
    },
    options: {
    	low: 0,
        showArea: true,
        showPoint: false,
        fullWidth: true,
        height: 300,
    }
  };

  // Widget Line Chart
  export var financeWidget: Chart = {
    type: 'Line', 
    data: {
	  series: [
        [5, 30, 27, 35, 30, 50, 70],
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
        top: 0
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      showArea: true,
      fullWidth: true,
      height:200,
      showPoint: false,
    },
  };

  // Widget Line Chart
  export var orderStatusWidget: Chart = {
    type: 'Line', 
    data: {
	  series: [
	    [null],
        [40, 15, 25, 20, 15, 20, 10, 25, 35, 13,35, 10, 30, 20, 10, 15, 20]
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
        top: 0
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      showArea: true,
      fullWidth: true,
      height:200,
      showPoint: false,
    },
  };

  // Widget Line Chart
  export var skillWidget: Chart = {
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
        top: 0
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      showArea: true,
      fullWidth: true,
      height:200,
      showPoint: false,
    },
  };
