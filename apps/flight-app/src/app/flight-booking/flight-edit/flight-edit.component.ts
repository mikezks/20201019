import {Component, OnInit} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { roundtrip, validateCity, validateCityWithParams } from '../../shared/validation/city-validators';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;
  editForm: FormGroup;

  /* validatorMap = {
    required: Validators.required

  };

  dynFormConfig = [
    {
      name: 'from',
      initValue: 'Graz',
      type: 'autocomplete',
      position: 'col3',
      validators: [
        'required'
      ]
    }
  ];

  searchFormData = {
    id: 0,
    from: 'Graz',
    to: 'Hamburg',
    date: ''
  }; */

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [0],
      from: ['Wien', [
        Validators.required,
        Validators.minLength(3),
        validateCity
      ]],
      to: ['Berlin', [
        Validators.required,
        Validators.minLength(3),
        validateCityWithParams([
          'Wien', 'Berlin', 'Frankfurt'
        ])
      ]],
      date: [new Date().toISOString()]
    });

    this.editForm.validator = roundtrip;

    this.editForm.valueChanges.subscribe(console.log);

    this.editForm.patchValue({ id: 1, from: 'New York'});

    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
  }
}
