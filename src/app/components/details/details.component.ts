
import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() weather!: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
