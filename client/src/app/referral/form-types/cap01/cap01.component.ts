import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cap01',
  templateUrl: './cap01.component.html',
  styleUrls: ['./cap01.component.sass']
})
// Formulaire Détachement
export class Cap01Component implements OnInit {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submit.emit(this.data);
  }

}
