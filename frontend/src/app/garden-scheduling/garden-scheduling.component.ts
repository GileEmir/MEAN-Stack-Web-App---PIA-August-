import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GardenSchedulingService } from '../services/garden-scheduling.service';
import { GardenSchedule } from '../models/GardenSchedule';
import { GardenLayout } from '../models/GardenLayout';

@Component({
  selector: 'app-garden-scheduling',
  templateUrl: './garden-scheduling.component.html',
  styleUrls: ['./garden-scheduling.component.css']
})
export class GardenSchedulingComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() layout: GardenLayout | undefined; // Add this input
  gardenForm: FormGroup = new FormGroup({});
  currentStep: number = 1;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private gardenSchedulingService: GardenSchedulingService) {}

  ngOnInit(): void {
    const optionsGroup = this.fb.group(
      this.options.reduce((acc: { [key: string]: any }, option: string) => {
        acc[option] = [false];
        return acc;
      }, {})
    );

    this.gardenForm = this.fb.group({
      selectedDate: ['', Validators.required],
      selectedTime: ['', Validators.required],
      totalArea: ['', [Validators.required, Validators.min(1)]],
      gardenType: ['', Validators.required],
      poolArea: [''],
      greenArea: [''],
      furnitureArea: [''],
      fountainArea: [''],
      tables: [''],
      chairs: [''],
      description: [''],
      options: optionsGroup,
    });
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.gardenForm.valid) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep === 2) {
      this.gardenForm.patchValue({
        poolArea: '',
        greenArea: '',
        furnitureArea: '',
        fountainArea: '',
        tables: '',
        chairs: '',
        description: ''
      });
      this.options.forEach(option => {
        this.gardenForm.get('options')?.get(option)?.setValue(false);
      });
    }
    this.currentStep--;
  }

  onSubmit(): void {
    if (this.gardenForm.valid) {
      const formValue = this.gardenForm.value;
      const totalArea = formValue.totalArea;
      const poolArea = formValue.poolArea || 0;
      const greenArea = formValue.greenArea || 0;
      const furnitureArea = formValue.furnitureArea || 0;
      const fountainArea = formValue.fountainArea || 0;
      const tables = formValue.tables || 0;
      const chairs = formValue.chairs || 0;

      if (poolArea + greenArea + furnitureArea + fountainArea > totalArea) {
        this.errorMessage = 'The sum of the areas exceeds the total area.';
        return;
      }

      const selectedDate = formValue.selectedDate;
      const selectedTime = formValue.selectedTime;

      const gardenSchedule: GardenSchedule = {
        date: selectedDate,
        time: selectedTime,
        totalArea: formValue.totalArea,
        gardenType: formValue.gardenType,
        poolArea: formValue.poolArea,
        greenArea: formValue.greenArea,
        furnitureArea: formValue.furnitureArea,
        fountainArea: formValue.fountainArea,
        tables: formValue.tables,
        chairs: formValue.chairs,
        description: formValue.description,
        options: formValue.options,
        layout: this.layout // Include the layout data
      };

      console.log('Submitting garden schedule:', gardenSchedule);

      this.gardenSchedulingService.scheduleGarden(gardenSchedule).subscribe(
        response => {
          console.log('Garden schedule submitted successfully', response);
        },
        error => {
          this.errorMessage = 'Error submitting garden schedule. Please try again later.';
          console.error('Error submitting garden schedule', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}