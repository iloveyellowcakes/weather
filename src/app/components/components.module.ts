import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    SearchComponent,
    CardComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchComponent,
    CardComponent,
    DetailsComponent,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
