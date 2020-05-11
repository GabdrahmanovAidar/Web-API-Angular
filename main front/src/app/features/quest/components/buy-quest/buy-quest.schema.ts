
export const buyQuestSchema =
    [
        {
            key: 'time',
            type: 'input',
            templateOptions: {
                label: 'Время, в которое начнете выполнение',
                placeholder: 'Введите время старта',
                required: true
            }
        },
        {
            key: 'comment',
            type: 'input',
            templateOptions: {
                label: 'Комментарий к заказу',
                placeholder: 'Введите свои пожелания'            }
        }
    ];