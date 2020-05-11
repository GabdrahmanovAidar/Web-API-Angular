import { AbstractControl } from '@angular/forms';

export function birthDateValidator(control: AbstractControl) {
    const dateValue = control.value;
    var regex = new RegExp(/^(0[1-9]|1\d|2\d|3[01])[\/|.](0[1-9]|1[0-2])[\/|.](19|20)\d{2}$/);
    if (!regex.test(dateValue)) {
      return { birthDateFormat: true };
    }
    return null;
}
