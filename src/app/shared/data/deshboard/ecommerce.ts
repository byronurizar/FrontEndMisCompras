import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

var seq : number = 0;
var delays : number = 80;
var durations : number = 500;


export var chart1: Chart = {
    type: 'Line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        series: [
          [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
          [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
          [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
          [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
        ]
     },
     options: {
        low: 0,
        showArea: false,
        fullWidth: true,
        height:475,
     },
     events : {
      draw: (data) => {
          seq++;
          if(data.type === 'line') {
              data.element.animate({
                    opacity: {
                      begin: seq * delays + 1000,
                      dur: durations,
                      from: 0,
                      to: 1
                    }
              });
            } else if(data.type === 'label' && data.axis === 'x') {
              data.element.animate({
                    y: {
                      begin: seq * delays,
                      dur: durations,
                      from: data.y + 100,
                      to: data.y,
                      easing: 'easeOutQuart'
                    }
              });
            } else if(data.type === 'label' && data.axis === 'y') {
              data.element.animate({
                    x: {
                      begin: seq * delays,
                      dur: durations,
                      from: data.x - 100,
                      to: data.x,
                      easing: 'easeOutQuart'
                    }
              });
            } else if(data.type === 'point') {
              data.element.animate({
                    x1: {
                      begin: seq * delays,
                      dur: durations,
                      from: data.x - 10,
                      to: data.x,
                      easing: 'easeOutQuart'
                    },
                    x2: {
                      begin: seq * delays,
                      dur: durations,
                      from: data.x - 10,
                      to: data.x,
                      easing: 'easeOutQuart'
                    },
                    opacity: {
                      begin: seq * delays,
                      dur: durations,
                      from: 0,
                      to: 1,
                      easing: 'easeOutQuart'
                    }
              });
            } else if(data.type === 'grid') {
              var pos1Animation = {
                    begin: seq * delays,
                    dur: durations,
                    from: data[data.axis.units.pos + '1'] - 30,
                    to: data[data.axis.units.pos + '1'],
                    easing: 'easeOutQuart'
              };
              var pos2Animation = {
                    begin: seq * delays,
                    dur: durations,
                    from: data[data.axis.units.pos + '2'] - 100,
                    to: data[data.axis.units.pos + '2'],
                    easing: 'easeOutQuart'
              };
              var animations = {};
                  animations[data.axis.units.pos + '1'] = pos1Animation;
                  animations[data.axis.units.pos + '2'] = pos2Animation;
                  animations['opacity'] = {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
              };
              data.element.animate(animations);
            }
       }
      }
};

  // Widget Line Chart
 export var WidgetLineChart1: Chart = {
    type: 'Line', 
    data: {
	  series: [
        [0, 75, 50, 15, 50, 25, 100]
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
		   top:30,
		   left:30,
		   right:30,
		   bottom:30
		},
        showArea: false,
        fullWidth: true,
        height:100
    },
  };

// Widget Line Chart
export var  WidgetLineChart2: Chart = {
    type: 'Line', 
    data: {
	  series: [
        [100, 25, 50, 75, 100, 65, 0]
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
		   top:30,
		   left:30,
		   right:30,
		   bottom:30
		},
        showArea: false,
        fullWidth: true,
        height:100
    },
  };


  // Chart  Animations
export var  overAllChart: Chart = {
	  type: 'Line',
	  data: {
	      labels: ['30', '70', '110', '160', '210', '260', '310', '360'],
	      series: [
	        [0, 75, 50, 15, 50, 25, 100],
	        [100, 25, 50, 75, 100, 65, 0]
	      ]
	   },
	   options: {
	      low: 0,
          showArea: false,
          fullWidth: true,
          height:250,
	   },
	   events : {
	    draw: (data) => {
	        if(data.type === 'line') {
				data.element.animate({
			  		opacity: {
						begin: 1 * delays + 1000,
						dur: durations,
						from: 0,
						to: 1
			  		}
				});
		  	} else if(data.type === 'point') {
				data.element.animate({
			  		x1: {
						begin: 1 * delays,
						dur: durations,
						from: data.x - 10,
						to: data.x,
						easing: 'easeOutQuart'
			  		},
			  		x2: {
						begin: 1 * delays,
						dur: durations,
						from: data.x - 10,
						to: data.x,
						easing: 'easeOutQuart'
			  		},
			  		opacity: {
						begin: 1 * delays,
						dur: durations,
						from: 0,
						to: 1,
						easing: 'easeOutQuart'
			  		}
				});
		  	} 
	     }
  	  }
  };


