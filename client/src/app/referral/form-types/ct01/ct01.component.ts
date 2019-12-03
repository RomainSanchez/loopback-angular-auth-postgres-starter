import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ct01',
  templateUrl: './ct01.component.html',
  styleUrls: ['./ct01.component.sass']
})

// Formulaire CT Règlement intérieur
export class Ct01Component {
  @Input() data: any = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onSubmit() {
    this.formSubmit.emit(this.data);
  }
}

