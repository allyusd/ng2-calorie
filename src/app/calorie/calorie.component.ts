import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

@Component({
  selector: 'app-calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit, AfterViewInit {
  private url:string = 'https://spreadsheets.google.com/feeds/list/1EXEiX0Mh2vbD0JF7gyQl5ff3xMhBRCz0kMSNVcwDsyo/1/public/values?alt=json';
  private initialized:boolean = false;
  private lineMode:string = 'time';
  private dataScoure:any = {
    label: [],
    data: [
      {data: [], label: 'Body Weight'}
    ]
  };

  public dateFilter:any = {
    after: '2008-01-01',
    before: '2026-01-01'
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Body Weight'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
        animation: false,
        responsive: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              //unit: 'month',
              displayFormats: {
                'millisecond': 'HH:mm:ss.SSS',
                'second': 'HH:mm:ss.SSS',
                'minute': 'HH:mm',
                'hour': 'HH:mm',
                'day': 'YYYY-MM-DD',
                'week': 'YYYY-MM-DD',
                'month': 'YYYY-MM',
                'quarter': 'YYYY - [Q]Q',
                'year': 'YYYY',
              }
            }
          }],
        }
      };
  public lineChartColors:Array<any> = [
    {
      fill: false,
      borderWidth: 1,
      lineTension: 0,
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

  private dataProcess = (data:any):void => {
    this.dataScoure.label.length = 0;
    this.dataScoure.data[0].data.length = 0;

    for (let entry of data.json().feed.entry) {
      let date = entry['gsx$date']['$t'];
      let bodyweight = entry['gsx$bodyweight']['$t'];

      let today = moment().format('YYYY-MM-DD');

      if (date !== "" && bodyweight !== "" && date <= today) {
        this.dataScoure.label.unshift(date);
        this.dataScoure.data[0].data.unshift(bodyweight);
      }
    }

    this.lineChartLabels = this.dataScoure.label.slice();
    this.lineChartData = JSON.parse(JSON.stringify(this.dataScoure.data));

    this.initialized = true;
  }

  private filterProcess():void {
    this.lineChartLabels.length = 0;
    this.lineChartData[0].data.length = 0;

    for (let i = 0; i < this.dataScoure.label.length; i++) {

      let date = this.dataScoure.label[i];
      let bodyweight = this.dataScoure.data[0].data[i];

      let after = moment(this.dateFilter.after);
      let before = moment(this.dateFilter.before);

      if (moment(date) >= after && moment(date) <= before) {
        this.lineChartLabels.push(date);
        this.lineChartData[0].data.push(bodyweight);
      }
    }

    this.lineChartLabels = this.lineChartLabels.slice();
    this.lineChartData = this.lineChartData.slice();
  }
  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
