import { Observable, interval, finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Weather } from 'src/app/models/weather';
import { WeatherService } from '../services/weather/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cityName: string = 'Araxá';
  weatherData!: Weather;
  condition!: any;
  color!: string;

  loader: boolean = true;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);

    interval(5 * 60 * 1000)
      .subscribe(() => {
        this.getWeatherData(this.cityName);

        console.log(this.cityName);
        console.log('oi');

      });
  }



  getWeekDayName(): void {
    for (let item of this.weatherData.forecast.forecastday) {
      let weatherDate = item.date;
      weatherDate = weatherDate.replace(/-/, '/').replace(/-/, '/');
      let finalDate = new Date(weatherDate);
      let day = finalDate.toLocaleString('en-us', { weekday: 'short' });
      item.date = day;
    }
    this.weatherData.forecast.forecastday[0].date = 'Today';
  }

  getCity(city: string): void {
    this.getWeatherData(city);
    this.cityName = city;
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName)
      .pipe(
        finalize(() => this.loader = false)
      )
      .subscribe((data: Weather) => {
        this.weatherData = data;
        this.condition = {
          temp: {
            cur: this.weatherData.current.temp_c,
            feelsLike: this.weatherData.current.feelslike_c,
            max: this.weatherData.forecast.forecastday[0].day.maxtemp_c,
            min: this.weatherData.forecast.forecastday[0].day.mintemp_c
          },
          text: this.weatherData.current.condition.text,
          icon: this.weatherData.current.condition.icon,
          country: this.weatherData.location.country,
          city: this.weatherData.location.name
        };

        this.getWeekDayName();
        this.nightOrDayColor();
        this.sunriseColor();
        this.cloudyColor();

        console.log(this.weatherData);
      });

  }

  cloudyColor(): void {
    const day = this.weatherData.current.is_day;
    const cloudy = this.isCloudy();

    if (cloudy && day) {
      this.color = 'cloudy-day';
      return;
    }
    if (!cloudy && !day) {
      this.color = 'cloudy-night';
    }
  }

  nightOrDayColor(): void {
    const day = this.weatherData.current.is_day;
    if (!day) {
      this.color = 'night';
      return;
    }
    this.color = 'day';
  }

  sunriseColor() {
    const time = this.splitAndGetHour(this.weatherData.location.localtime, 2);
    const sunrise = this.splitAndGetHour(this.weatherData.forecast.forecastday[0].astro.sunrise, 0);
    if (time >= sunrise - 0.20 && time <= sunrise) {
      this.color = 'sunrise';
    }
  }

  isCloudy(): boolean {
    if (
      this.condition.text === 'Cloudy' ||
      this.condition.text === 'Partly cloudy' ||
      this.condition.text === 'Rain' ||
      this.condition.text === 'Heavy rain' ||
      this.condition.text === 'Overcast'
    ) {
      return true;
    }
    return false;
  }

  splitAndGetHour(local: string, index: number): number {
    let array = local.split(/(\s+)/);
    let finalTime = array[index];
    return parseFloat(finalTime.replace(':', '.'));
  }

}
