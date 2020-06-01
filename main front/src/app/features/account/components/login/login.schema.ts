import { Validators } from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginSchema: FormlyFieldConfig[] =
    [
        {
            key: 'username',
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

        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                label: 'Пароль',
                placeholder: 'Введите ваш пароль',
                required: true,
                type: 'password'
            }
        }
    ];
