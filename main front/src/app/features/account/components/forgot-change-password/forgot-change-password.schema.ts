import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const fogotChangePassword: FormlyFieldConfig[] = [
    {
        key: 'password',
        type: 'input',
        templateOptions: {
            label: 'Пароль',
            placeholder: 'Введите ваш пароль',
            required: true,
            type: 'password',
            minLength: 8,
            maxLength: 20
        }
    },
    {
        key: 'confirmPassword',
        type: 'input',
        templateOptions: {
            label: 'Повторите пароль',
            placeholder: 'Повторите введенный ранее пароль',
            required: true,
            type: 'password',
            minLength: 8,
            maxLength: 20
        },
        asyncValidators: { validation: [confirmPasswordValidator] }
    }
];
