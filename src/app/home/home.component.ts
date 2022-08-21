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

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
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

  addItem(newItem: string): void {
    this.getWeatherData(newItem);
    this.cityName = newItem;
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName)
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

        const time = this.splitAndGetHour(this.weatherData.location.localtime, 2);

        this.nightOrDayColor(time);
        this.sunriseColor(time);
        this.cloudyColor(time);

        console.log(this.weatherData);
      });

  }

  splitAndGetHour(local: string, index: number): number {
    let array = local.split(/(\s+)/);
    let finalTime = array[index];
    return parseFloat(finalTime.replace(':', '.'));
  }


  cloudyColor(time: number): void {
    const day = this.isDay(time);
    if (
      (this.condition.text === 'Cloudy' && day) ||
      (this.condition.text === 'Partly cloudy' && day) ||
      (this.condition.text === 'Rain' && day) ||
      (this.condition.text === 'Heavy rain' && day) ||
      (this.condition.text === 'Overcast' && day)
    ) {
      this.color = 'cloudy-day';
      return
    }

    if (
      (this.condition.text === 'Cloudy' && !day) ||
      (this.condition.text === 'Partly cloudy' && !day) ||
      (this.condition.text === 'Rain' && !day) ||
      (this.condition.text === 'Heavy rain' && !day) ||
      (this.condition.text === 'Overcast' && !day)
    ) {
      this.color = 'cloudy-night';
    }
  }

  sunriseColor(time: number) {
    const sunrise = this.splitAndGetHour(this.weatherData.forecast.forecastday[0].astro.sunrise, 0);
    const sunset = this.splitAndGetHour(this.weatherData.forecast.forecastday[0].astro.sunset, 0);

    if (time >= sunrise - 0.20 && time <= sunrise) {
      this.color = 'sunrise';
    }
  }

  nightOrDayColor(time: number): void {
    const day = this.isDay(time);
    if (!day) {
      this.color = 'night';
      return;
    }
    this.color = 'day';
  }

  isDay(time: number): boolean {
    const timeInt = Math.round(time);
    for (let item of this.weatherData.forecast.forecastday[0].hour) {
      const hour = this.splitAndGetHour(item.time, 2);
      if (hour === timeInt && item.is_day) {
        return true;
      }
    }
    return false;
  }




}
