import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit, AfterViewInit {
  private url:string = 'https://spreadsheets.google.com/feeds/list/1EXEiX0Mh2vbD0JF7gyQl5ff3xMhBRCz0kMSNVcwDsyo/1/public/values?alt=json';
  private initialized:boolean = false;

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Body Weight'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {};
  public lineChartColors:Array<any> = [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      spanGaps: false,
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private http: Http) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.timeLine();
    this.getData();
  }

  public getData():void {
    this.initialized = false;

    this.http.get(this.url)
      .toPromise()
      .then(this.dataProcess)
      .catch(this.handleError);
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public timeLine():void {
    let options = {
      animation: false,
      responsive: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            //unit: 'day',
            displayFormats: {
              'millisecond': 'HH:mm:ss.SSS',
              'second': 'HH:mm:ss.SSS',
              'minute': 'HH:mm:ss.SSS',
              'hour': 'HH:mm:ss.SSS',
              'day': 'YYYY/MM/DD',
              'week': 'YYYY/MM/DD',
              'month': 'YYYY/MM/DD',
              'quarter': 'YYYY/MM/DD',
              'year': 'YYYY/MM/DD',
            }
          }
        }],
      }
    };

    this.lineChartOptions = options;
  }

  public dataLine():void {
    let options = {
      animation: false,
      responsive: false
    };

    this.lineChartOptions = options;
  }

  private dataProcess = (data:any):void => {
    this.lineChartLabels.length = 0;
    this.lineChartData[0].data.length = 0;

    for (let entry of data.json().feed.entry) {
      let date = entry['gsx$date']['$t'];
      let bodyweight = entry['gsx$bodyweight']['$t'];

      let d = new Date().toISOString().slice(0, 10).split('-');
      let today = d[0] +'/'+ d[1] +'/'+ d[2];

      if (date !== "" && bodyweight !== "" && date <= today) {
        this.lineChartLabels.unshift(date);
        this.lineChartData[0].data.unshift(bodyweight);
      }
    }

    this.lineChartLabels = this.lineChartLabels.slice();
    this.lineChartData = this.lineChartData.slice();

    this.initialized = true;
  }
  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
