import { AbstractControl, FormArray, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

const get = require('lodash/get');
const includes = require('lodash/includes');

export class CustomValidators {

  static hoursMinutes(control: AbstractControl): ValidationErrors | null {
   
    const value = control.value;
    if (value && value !== '') {
      const [hours, minutes] = value.split(':');
      const hoursNumber = Number(hours);
      const minutesNumber = Number(minutes);
      let isValid = !Number.isNaN(hoursNumber) &&
        !Number.isNaN(minutesNumber) &&
        hoursNumber <= 24 && hoursNumber >= 0 &&
        minutesNumber <= 60 && minutesNumber >= 0;

      return isValid ? null : { hoursMinutes: value };
    }
    return null;
  }

  static mobilePhone(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // const internationalPhoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/;
    const ruMobilePhoneRegExp = /^\+[1-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    const isValid = value === '' || value == null ? true : ruMobilePhoneRegExp.test(value);
    return isValid ? null : { mobilePhone: { mobilePhone: value } };
    // return null;
  }

  static emailOrEmpty(control: AbstractControl): ValidationErrors | null {
    return (control.value == null || control.value === '') ? null : Validators.email(control);
  }
  
  static passwordsAreEqual(AC: AbstractControl) {
    const formGroup = AC.parent;
    if (formGroup) {
         const passwordControl = formGroup.get('password'); // to get value in input tag
         const confirmPasswordControl = formGroup.get('repassword'); // to get value in input tag

         if (passwordControl && confirmPasswordControl) {
             const password = passwordControl.value;
             const confirmPassword = confirmPasswordControl.value;
             if (password !== confirmPassword) { 
                 return { matchPassword: true };
             } else {
                 return null;
             }
         }
    }

    return null;
 }
  static latinLetters(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regexp = /^[a-zA-Z]+$/;
    const isValid = value === '' || value == null ? true : regexp.test(value);

    return isValid ? null : { latinLetters: true };
  }

  static unique(primitivePath: string): ValidatorFn {
    return (control: FormArray): { [key: string]: any } => {
      const values = control.value as any[];
      const primitivesValues = values.map((value) => get(value, primitivePath)) as any[];
      const duplicatedValues = primitivesValues.reduce((result, value, index) => {
        if (value && !result.some((v) => value === v) && includes(primitivesValues, value, index + 1)) {
          result.push(value);
        }
        return result;
      }, []);

      const isValid = !duplicatedValues.length;
      return isValid ? null : { unique: { duplicatedValues } };
    };
  }

  static object(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = typeof value === 'object';
    return isValid ? null : { object: true };
  }

}
