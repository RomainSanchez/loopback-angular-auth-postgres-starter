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
  populationChoices: any[] = [
    '2000 à 10 000 habitants',
    '10 000 à 20 000 habitants',
    '20 000 à 40 000 habitants',
    '40 000 à 80 000 habitants'
  ];
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
