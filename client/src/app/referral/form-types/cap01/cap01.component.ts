import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-cap01',
  templateUrl: './cap01.component.html',
  styleUrls: ['./cap01.component.sass']
})
// Formulaire CAP Détachement sur emploi fonctionnel
export class Cap01Component {
  @Input() data: any = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  gradeChoices: any[] = [
    'Attaché',
    'Attaché principal',
    'Attaché hors classe',
    'Directeur'
  ];

  constructor() {}

  onSubmit() {
    this.formSubmit.emit(this.data);
  }

}
