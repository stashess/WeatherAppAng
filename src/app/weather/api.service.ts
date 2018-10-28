import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Weather} from './weather-data.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8080/api/weather';

  constructor(private http: HttpClient) {
  }

  getWeatherBetween(p1: string, p2: string): Observable<Object> {
    const options = {params: new HttpParams().set('startDate', p1).set('endDate', p2) };
    console.log(options);
    return this.http.get(this.apiUrl + '/getWeather', options);
  }

}
