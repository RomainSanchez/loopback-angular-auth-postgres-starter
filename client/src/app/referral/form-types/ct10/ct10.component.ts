import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-ct10',
  templateUrl: './ct10.component.html',
  styleUrls: ['./ct10.component.sass']
})

// Formulaire CT Tableau des emplois
export class Ct10Component implements OnInit, AfterViewChecked {
  @Input() data: any = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const savedData = JSON.parse(localStorage.getItem('referralData')).data;

    this.data = JSON.parse(JSON.stringify(this.data));
    delete this.data.information;

    if (savedData && Object.keys(this.data).length < 2) {
      this.data = savedData;
    }

    if (!this.data.jobs) {
      this.data.jobs = [];
    }

    this.buildForm();
  }

  ngAfterViewChecked() {
    // Prevent ExpressionChangedAfterCheckedError when adding required fields dynamically
    this.changeDetector.detectChanges();
  }

  submit() {
    this.data = this.form.value;

    this.formSubmit.emit(this.data);
    localStorage.removeItem('referralData');
  }

  addJob() {
    const jobArray = this.form.controls.jobs as FormArray;

    jobArray.insert(jobArray.length, this.formBuilder.group({
      description: ['', Validators.required],
      grade: ['', Validators.required],
      hours: ['', Validators.required],
      suppression: ['', Validators.required],
      motive: ['', Validators.required],
      new: [''],
      newDescription: [''],
      newGrade: [''],
      newHours: [''],
      creation: ['']
    }));
  }

  removeJob(index) {
    const jobArray = this.form.controls.jobs as FormArray;

    jobArray.removeAt(index);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      application: ['', Validators.required],
      jobs: this.formBuilder.array([])
    });

    if (this.data.jobs.length > 0) {
      this.data.jobs.forEach(job => {
        this.insertJob(job);
      });
    }

    if (Object.values(this.data).length > 1) {
      this.form.setValue(this.data);
    }

    this.form.statusChanges.subscribe(() => {
      localStorage.setItem('referralData', JSON.stringify(this.form.value));
    });
  }

  private insertJob(job) {
    const jobArray = this.form.controls.jobs as FormArray;

    jobArray.insert(jobArray.length, this.formBuilder.group({
      description: [job.description, Validators.required],
      grade: [job.grade, Validators.required],
      hours: [job.hours, Validators.required],
      suppression: [job.suppression, Validators.required],
      motive: [job.motive, Validators.required],
      new: [job.new, Validators.required],
      newDescription: [job.newDescription],
      newGrade: [job.newGrade],
      newHours: [job.newHours],
      creation: [job.creation]
    }));
  }
}

