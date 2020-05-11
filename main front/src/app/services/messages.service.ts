import { Injectable } from '@angular/core';
import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';

export default class MessagesService {
  getMessage = (validationMessages) => {
    let errMessages: ValidationMessageOption[] = [];
    for (const element of validationMessages) {
      errMessages.push({ name: element.name, message: element.message });
    }
    return errMessages;
  }
}
