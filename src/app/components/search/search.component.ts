import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myForm!: FormGroup;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      search:["", Validators.max(15)],
    });
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

}
