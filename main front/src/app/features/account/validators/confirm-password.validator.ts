import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(passwordControl: AbstractControl) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const passwordInput = passwordControl.parent.get('password');
            const passwordConfirmationInput = passwordControl.parent.get('confirmPassword');
            if (passwordInput.value !== passwordConfirmationInput.value) {
                resolve({ passwordDifferent: true });
            } else {
                resolve(null);
            }
        }, 500);
    });
}
