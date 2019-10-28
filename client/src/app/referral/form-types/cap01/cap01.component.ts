import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-cap01',
  templateUrl: './cap01.component.html',
  styleUrls: ['./cap01.component.sass']
})
// Formulaire Détachement sur emploi fonctionnel
export class Cap01Component {
  @Input() data: any = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  populationChoices: any[] = [
    { label: '2000 à 10 000 habitants', value: '<10' },
    { label: '10 000 à 20 000 habitants', value: '<20' },
    { label: '20 000 à 40 000 habitants', value: '<40' },
    { label: '40 000 à 80 000 habitants', value: '<80' },
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
