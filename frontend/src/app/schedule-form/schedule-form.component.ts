import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent {
  step = 1;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      area: ['', Validators.required],
      gardenType: ['', Validators.required],
      poolArea: [''],
      greenArea: [''],
      loungeArea: [''],
      fountainArea: [''],
      tableCount: [''],
      chairCount: [''],
      description: ['']
    });
  }

  nextStep(): void {
    this.step++;
  }

  previousStep(): void {
    this.step--;
  }

  submit(): void {
    if (this.form.valid) {
      // Handle form submission
    }
  }
}