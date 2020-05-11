import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const changePasswordSchema: FormlyFieldConfig[] =
    [
        {
            key: 'currentPassword',
            type: 'input',
            templateOptions: {
                label: 'Старый Пароль',
                placeholder: 'Введите ваш текущий пароль',
                required: true,
                type: 'password'
            }
        },
        {
            key: 'newPassword',
            type: 'input',
            templateOptions: {
                label: 'Новый Пароль',
                placeholder: 'Введите новый пароль',
                required: true,
                type: 'password',
                minLength: 8,
                maxLength: 20
            }
        }
    ];
