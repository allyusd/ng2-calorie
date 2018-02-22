import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AlertsComponent } from './alerts/alerts.component';
import { HomeComponent } from './home/home.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalorieComponent } from './calorie/calorie.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent,
    HomeComponent,
    LineChartComponent,
    PageNotFoundComponent,
    CalorieComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'line-chart', component: LineChartComponent },
      { path: 'calorie', component: CalorieComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
