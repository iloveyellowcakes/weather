
import { Component, OnInit } from '@angular/core';
import { Weather } from '../models/weather';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  cityName: string = 'Paris';
  weatherData?: Weather;

  test: any;
  icons!: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
    this.getIcons(this.test);
  }


  addItem(newItem: any) {
    this.getWeatherData(newItem);
    this.cityName = newItem;
    console.log(newItem, 'teste');
  }

  getIcons(text: string) {
    console.log(text, 'text');

    if (text === 'Sunny') {
      this.icons = 'fa-solid fa-sun';
      console.log(this.icons, 'icons');
    }

    if (text === 'Partly Cloudy') {
      this.icons = 'fa-solid fa-cloud';
      console.log(this.icons, 'icons');
    }
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName)
      .subscribe({
        next: (response: Weather) => {
          this.weatherData = response;

          this.test = {
            temp: {
              cur: this.weatherData?.current_observation.condition.temperature,

            },
            text: this.weatherData?.current_observation.condition.text,
            city: this.weatherData?.location.city
          };
          console.log(this.weatherData);


          this.getIcons(this.test.text);


        }
      });
  }

}
