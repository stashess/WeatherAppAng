import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {formatDate} from '@angular/common';
import {Weather} from './weather-data.model';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, AfterViewInit {

  weatherData: Weather;
  weatherHData: Weather;
  weatherFData: Weather;

  startDate: Date = new Date();
  endDate: Date = new Date();
  mintemp: number;
  maxtemp: number;
  avgtemp: number;

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy HH:mm',
    defaultOpen: false
  };

  constructor(private api: ApiService) {
  }


  ngOnInit() {
    this.startDate = this.startDate
      .setTime(this.startDate.getTime() - (this.startDate.getDay() ? this.startDate.getDay() : 7) * 24 * 60 * 60 * 1000);
  }

  ngAfterViewInit() {
    this.filter();
  }

  filter() {
    this.api.getWeatherBetween(formatDate(this.startDate, 'yyyy-MM-ddTHH:mm', 'EN-GB'), formatDate(this.endDate, 'yyyy-MM-ddTHH:mm', 'EN-GB')).subscribe(value => {
      this.weatherData = value;
      this.clearValues();
      this.weatherData.sort((a, b) => a.dateTime.localeCompare(b.dateTime));
      if (this.weatherData.length > 0) {
        this.statisticalProcess();
        for (const weather of this.weatherData) {
          if (weather.dateTime.localeCompare(formatDate(Date.now() 'yyyy-MM-ddTHH:mm', 'EN-GB')) >= 0) {
            this.weatherFData.push(weather);
          } else {
            this.weatherHData.push(weather);
          }
        }
      }
    });
  }

  statisticalProcess() {
    let sum = 0;
    for (const weather of this.weatherData) {
      weather.temp = Math.round(weather.temp);
      sum += weather.temp;
      if (!this.mintemp) {
        this.mintemp = weather.temp;
        this.maxtemp = weather.temp;
      }

      if (weather.temp > this.maxtemp) {
        this.maxtemp = weather.temp;
      }

      if (weather.temp < this.mintemp) {
        this.mintemp = weather.temp;
      }

    }
    this.avgtemp = Math.round(sum / this.weatherData.length);
  }

  clearValues(){
    this.weatherFData = new Array();
    this.weatherHData = new Array();
    this.mintemp = 1000;
    this.maxtemp = -1000;
  }

}
