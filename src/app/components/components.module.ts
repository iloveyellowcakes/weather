import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateComponent } from './date/date.component';



@NgModule({
  declarations: [
    SearchComponent,
    CardComponent,
    DateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchComponent,
    CardComponent,
    DateComponent
  ]
})
export class ComponentsModule { }
