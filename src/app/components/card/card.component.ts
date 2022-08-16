import { Component, Input, OnInit } from '@angular/core';
import { Forecast, Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() weather!: Weather
  teste: Forecast[] = [];

  icons: any

  constructor() { }

  ngOnInit(): void {
    this.getData()
    console.log(this.teste.length);

  }

  getData() {
    let i =0
    while(this.teste.length < 3) {
      this.teste.push(this.weather.forecasts[i])
      this.getIcons(this.weather.forecasts[i].text)
      i++
    }
  }

  getIcons(text:string) {

    if(text === 'Sunny') {
      this.icons = 'fa-solid fa-sun'
    }

    if (text === 'Partly Cloudy') {
      this.icons = 'fa-solid fa-cloud';
      console.log(this.icons, 'icons');
    }
  }



}
