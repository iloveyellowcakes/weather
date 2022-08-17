import { Component, Input, OnInit } from '@angular/core';
import { Forecast, Weather } from 'src/app/models/weather';
import { Weather2 } from 'src/app/models/weather2';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() weather!: any;

  constructor() { }

  ngOnInit(): void {


  }


  // getIcons(text: string) {

  //   if (text === 'Sunny') {
  //     this.icons = 'fa-solid fa-sun';
  //   }

  //   if (text === 'Partly Cloudy') {
  //     this.icons = 'fa-solid fa-cloud';
  //     console.log(this.icons, 'icons');
  //   }
  // }



}
