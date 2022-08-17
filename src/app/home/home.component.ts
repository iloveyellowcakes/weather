
import { Component, OnInit } from '@angular/core';
import { City } from '../models/citys';
import { Weather } from '../models/weather';
import { Weather2 } from '../models/weather2';
import { WeatherService } from '../services/weather/weather.service';

export interface teste {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  cityName: string = 'Paris';
  weatherData!: Weather;
  weatherData2!: Weather2;

  test: any;
  test2: any;
  test4!: any[];
  icons!: string;
  test3!: City;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  getData() {

    for (let item of this.weatherData2.forecast.forecastday) {
      let weatherDate = item.date;
      weatherDate = weatherDate.replace(/-/, '/').replace(/-/, '/');
      let finalDate = new Date(weatherDate);
      let day = finalDate.toLocaleString('en-us', { weekday: 'short' });

      item.date = day;


    }
    console.log(this.weatherData2, 'd');

  }



  addItem(newItem: string) {
    console.log(newItem, 'teste2');
    // this.weatherService.getCity(newItem)
    // .subscribe({
    //   next: (data: any) => {
    //     this.test3 = data;
    //     this.getWeatherData(this.test3.name);
    //     this.cityName = this.test3.name;
    //   }
    // })
    this.getWeatherData(newItem);
    this.cityName = newItem;

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

  getWeatherData(cityname: string) {
    this.weatherService.getWeatherData2(cityname)
      .subscribe((data: Weather2) => {
        this.weatherData2 = data;

        this.test4 = this.weatherData2.forecast.forecastday;

        console.log(this.test4);
        this.getData();




        this.test2 = {
          temp: {
            cur: this.weatherData2.current.temp_c,
            feelsLike: this.weatherData2.current.feelslike_c,
            max: this.weatherData2.forecast.forecastday[0].day.maxtemp_c,
            min: this.weatherData2.forecast.forecastday[0].day.mintemp_c

          },
          text: this.weatherData2.current.condition.text,
          icon: this.weatherData2.current.condition.icon,
          city: this.weatherData2?.location.name,
          country: this.weatherData2?.location.country
        };
        console.log(this.weatherData2, 'clo');

      });
  }

  // private getWeatherData(cityName: string) {
  //   this.weatherService.getWeatherData(cityName)
  //     .subscribe({
  //       next: (response: Weather) => {
  //         this.weatherData = response;

  //         this.test = {
  //           temp: {
  //             cur: this.weatherData?.current_observation.condition.temperature,

  //           },
  //           text: this.weatherData?.current_observation.condition.text,
  //           city: this.weatherData?.location.city
  //         };
  //         console.log(this.weatherData);


  //         this.getIcons(this.test.text);


  //       }
  //     });
  // }

}
