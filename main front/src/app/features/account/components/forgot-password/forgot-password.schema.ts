import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const forgotPasswordSchema: FormlyFieldConfig[] =
    [
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                label: 'email',
                placeholder: 'Введите вашу почту',
                required: true,
                type: 'email'
            },
            validators: {
                validation: [Validators.email]
            }

        }
    ];
