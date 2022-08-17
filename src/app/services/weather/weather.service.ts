import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeatherData(cityName: string): Observable<any> {
    console.log(environment.weatherApiBaseUrl);
    return this.httpClient.get(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
        .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
        .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
        .set('location', cityName)
        .set('format', 'json')
        .set('u', 'c')
    });

  }

  getWeatherData2(cityName: string): Observable<any> {
    console.log(environment.weatherApiBaseUrl);
    return this.httpClient.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
      headers: new HttpHeaders()
        .set('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com')
        .set('X-RapidAPI-Key', '64e3552041msh77d6ae8ccde5afbp1ae17djsn39e9b0eee6b9'),
      params: new HttpParams()
        .set('q', cityName)
        .set('days', '3')
    });

  }

  getCity(cityName: string) {
    return this.httpClient.get(`https://open-weather13.p.rapidapi.com/city/${cityName}`, {
      headers: new HttpHeaders()
        .set('X-RapidAPI-Host', 'open-weather13.p.rapidapi.com')
        .set('X-RapidAPI-Key', '64e3552041msh77d6ae8ccde5afbp1ae17djsn39e9b0eee6b9'),

    });
  }
}
