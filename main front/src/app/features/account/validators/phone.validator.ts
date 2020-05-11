import { AbstractControl } from '@angular/forms';

export function phoneValidator(control: AbstractControl) {
    const phoneValue = control.value;
    var regex = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gm);
    if (!regex.test(phoneValue)) {
      return { phoneFormat: true };
    }
    return null;
}
