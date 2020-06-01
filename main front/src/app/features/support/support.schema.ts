import { FormlyFieldConfig } from '@ngx-formly/core';
import { Validators } from '@angular/forms';

export const supportSchema: FormlyFieldConfig[] = [
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
        key: 'problem',
        type: 'input',
        templateOptions: {
            label: 'Ваша проблема',
            placeholder: 'Опишите вкратце вашу проблему',
            required: true,
            type: 'text',
            maxLength: 50,
            minLength: 10
        }
    },
    {
        key: 'message',
        type: 'textarea',
        templateOptions: {
            label: 'Ваше сообщение',
            placeholder: 'Введите сообщение...',
            required: true,
            rows: 6,
            maxLength: 500,
            minLength: 10
        }
    },
];
