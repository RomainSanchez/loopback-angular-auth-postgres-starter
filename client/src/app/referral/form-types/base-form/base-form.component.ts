import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-base-form'
})

export class BaseFormComponent implements OnInit {
  @Input() data: any = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('referralDataForm', { static: true }) form: NgForm;

  constructor() {}

  ngOnInit() {
    const savedData = JSON.parse(localStorage.getItem('referralData'));

    if(savedData && Object.keys(this.data).length < 2) {
      console.log(savedData);
      this.data = savedData;
    }

    this.form.statusChanges.subscribe(() => {
      localStorage.setItem('referralData', JSON.stringify(this.data));
    });
  }

  onSubmit() {
    this.formSubmit.emit(this.data);
    localStorage.removeItem('referralData');
  }

}
