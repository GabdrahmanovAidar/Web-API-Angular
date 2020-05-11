import { FormlyFieldConfig } from '@ngx-formly/core';
import { Validators } from '@angular/forms';
import { phoneValidator } from 'src/app/features/account/validators/phone.validator';

export const presentQuestSchema: FormlyFieldConfig[] =
    [
        {
            key: 'cityType',
            type: 'checkbox',
            defaultValue: true,
            templateOptions: {
                label: 'В текущий город'
            }
        },
        {
            key: 'fullname',
            type: 'input',
            templateOptions: {
                label: 'ФИО поздравляемого',
                placeholder: 'Введите ФИО поздравляемого',
                required: true
            }
        },
        {
            key: 'old',
            type: 'input',
            templateOptions: {
                label: 'Возраст клиента',
                placeholder: 'Выберите возраст клиента',
                required: true,
                maxLength: 2,
                minLength: 1
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                label: 'Почта поздравляемого',
                placeholder: 'Напишите email поздравляемого',
                required: true
            },
            validators: {
                validation: [Validators.email]
            }
        },
        {
            key: 'phone',
            type: 'input',
            templateOptions: {
                label: 'Телефон поздравляемого',
                placeholder: 'Напишите телефон поздравляемого',
                required: true
            },
            validators: {
                validation: [phoneValidator]
            }
        },
        {
            key: 'comment',
            type: 'input',
            templateOptions: {
                label: 'Комментарий',
                placeholder: 'Введите свои пожелания'
            }
        },
        {
            key: 'city',
            type: 'input',
            templateOptions: {
                label: 'Город',
                placeholder: 'Введите город поздравляемого',
                required: true
            },
            hideExpression: 'model.cityType'
        },
        {
            key: 'index',
            type: 'input',
            templateOptions: {
                label: 'Индекс',
                placeholder: 'Введите индекс поздравляемого',
                required: true
            },
            hideExpression: 'model.cityType'
        },
        {
            key: 'street',
            type: 'input',
            templateOptions: {
                label: 'Улица',
                placeholder: 'Введите улицу поздравляемого',
                required: true
            },
            hideExpression: 'model.cityType'
        },
        {
            key: 'house',
            type: 'input',
            templateOptions: {
                label: 'Дом',
                placeholder: 'Введите дом поздравляемого',
                required: true
            },
            hideExpression: 'model.cityType'
        },
        {
            key: 'appartment',
            type: 'input',
            templateOptions: {
                label: 'Квартира',
                placeholder: 'Введите квартиру поздравляемого',
                required: true
            },
            hideExpression: 'model.cityType'
        },
    ];