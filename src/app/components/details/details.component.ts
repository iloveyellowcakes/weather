import { Weather2 } from 'src/app/models/weather2';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() weather!: Weather2

  constructor() { }

  ngOnInit(): void {
  }

}
