import { Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { phoneValidator } from '../../validators/phone.validator';
import { birthDateValidator } from '../../validators/birthdate.validator';

export const registrationSchema: FormlyFieldConfig[] = [
    {
        key: 'email',
        type: 'input',
        templateOptions: {
            label: 'Ваша почта',
            placeholder: 'Введите ваш email',
            required: true,
            type: 'email'
        },
        validators: {
            validation: [Validators.email]
        }
    },
    {
        key: 'userName',
        type: 'input',
        templateOptions: {
            label: 'Логин',
            placeholder: 'Ваш логин',
            required: true,
            maxLength: 20
        }
    },
    {
        key: 'firstName',
        type: 'input',
        templateOptions: {
            label: 'Имя',
            placeholder: 'Ваше имя',
            required: false,
            maxLength: 20
        }
    },
    {
        key: 'lastName',
        type: 'input',
        templateOptions: {
            label: 'Фамилия',
            placeholder: 'Ваша фамилия',
            required: false,
            maxLength: 20
        }
    },
    {
        key: 'phone',
        type: 'input',
        templateOptions: {
            label: 'Номер телефона',
            placeholder: 'Ваш номер телефона',
            description: 'Нам нужен ваш номер телефона, чтобы мы могли с вами связаться',
            required: true
        },
        validators: {
            validation: [phoneValidator]
        }
    },
    {
        key: 'birthDate',
        type: 'input',
        templateOptions: {
            label: 'Дата рождения',
            placeholder: 'Ваша дата рождения в формате ДД/ММ/ГГГГ',
            required: false,
            type: 'date'
        }
    },
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
