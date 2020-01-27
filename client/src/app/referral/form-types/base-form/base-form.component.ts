import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Form } from 'src/app/shared/sdk';

@Component({
  selector: 'app-base-form'
})

export class BaseFormComponent implements OnInit {
  @Input() data: any = {};
  @Input() formType: Form;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('referralDataForm', { static: true }) form: NgForm;

  constructor() {}

  ngOnInit() {
    const savedData = JSON.parse(localStorage.getItem(this.formType.code));

    if (savedData && Object.keys(this.data).length < 2) {
      this.data = savedData;
    }

    this.form.statusChanges.subscribe(() => {
      localStorage.setItem(this.formType.code, JSON.stringify(this.data));
    });
  }

  onSubmit() {
    this.formSubmit.emit(this.data);
    localStorage.removeItem(this.formType.code);
  }

}
