import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { phoneValidator } from 'src/app/features/account/validators/phone.validator';

export const profileUpdateSchema: FormlyFieldConfig[] = [
    {
        key: 'firstName',
        type: 'input',
        templateOptions: {
            label: 'Имя',
            placeholder: 'Ваше имя',
            required: true,
            maxLength: 20
        }
    },
    {
        key: 'lastName',
        type: 'input',
        templateOptions: {
            label: 'Фамилия',
            placeholder: 'Ваша фамилия',
            required: true,
            maxLength: 20
        }
    },
    {
        key: 'patronymicName',
        type: 'input',
        templateOptions: {
            label: 'Отчество',
            placeholder: 'Ваше отчество',
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
            required: true,
            ngModel:'phone'
        },
        validators: {
            validation: [phoneValidator]
        },
        
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
    }
];
