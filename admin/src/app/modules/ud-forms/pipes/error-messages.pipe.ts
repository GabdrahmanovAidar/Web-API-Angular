import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'udFormsErrorMessages' })
export class UDFormsErrorMessagesPipe implements PipeTransform {
  transform(errors: object, messages?): string[] {
    if (errors) {
      const errorsKeys = Object.keys(errors);
      return errorsKeys.reduce((result, errorKey) => {
        result.push(messages && messages[errorKey]);
        return result;
      }, []);
    }
    return [];
  }
}
