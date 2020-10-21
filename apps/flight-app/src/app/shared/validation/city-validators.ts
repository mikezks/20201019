import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateCity(control: AbstractControl): ValidationErrors | null {
  const allowedCities = [
    'Graz', 'Hamburg', 'New York'
  ];

  if (control?.value && allowedCities.indexOf(control.value) === -1) {
    return {
      city: {
        actualCity: control.value,
        allowedCities
      }
    };
  }

  return null;
}

export function validateCityWithParams(allowedCities: string[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (control?.value && allowedCities.indexOf(control.value) === -1) {
      return {
        city: {
          actualCity: control.value,
          allowedCities
        }
      };
    }

    return null;
  };
}

export function roundtrip(group: FormGroup): ValidationErrors | null {
  const from = group.controls['from'].value;
  const to = group.controls['to'].value;

  if (from && to && from === to) {
    return { roundtrip: true };
  }

  return null;
}
