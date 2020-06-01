import { Injectable } from "@angular/core";

@Injectable()
export class UserShortNameFormatter {
  public formatName(user: { last_name?: string, first_name?: string, middle_name?: string },
                    options = { format: 'LFM.' }): string {
    if (user == null) {
      return user as null;
    }

    let result = '';

    if (options && options.format) {
      const format = options.format.slice();
      let i = 0;
      while (i < format.length) {
        const a = format.charAt(i);
        const b = format.charAt(i + 1);
        const c = format.charAt(i + 2);
        let short;
        let isNeedDivider;
        let plusIndex;

        if (b !== '.') {
          short = a;
          isNeedDivider = b != null;
          plusIndex = 1;
        } else {
          short = a + b;
          isNeedDivider = c != null;
          plusIndex = 2;
        }
        result += `${this.formatNameByShort(short, user)}`;
        if (isNeedDivider) {
          result += ' ';  // Divider
        }
        i += plusIndex;

      }
    } else {
      // Default formatting
      if (user.last_name) {
        result = `${user.last_name}`;
        if (user.first_name) result += ` ${this.firstChar(user.first_name)}.`;
        if (user.middle_name) result += ` ${this.firstChar(user.middle_name)}.`;
        return result;
      } else {
        return `${user.first_name} ${user.middle_name}`;
      }
    }

    // Удаляем лишние одинокие точки
    result = result.replace(' .', '');

    return result;
  }

  private formatNameByShort(short, user): string {
    switch (short) {
      case 'L':
        return `${this.firstChar(user.last_name).toUpperCase() + this.fromSecondChar(user.last_name).toLowerCase()}`;
      case 'L.':
        return `${this.firstChar(user.last_name).toUpperCase()}.`;
      case 'F':
        return `${this.firstChar(user.first_name).toUpperCase() + this.fromSecondChar(user.first_name).toLowerCase()}`;
      case 'F.':
        return `${this.firstChar(user.first_name).toUpperCase()}.`;
      case 'M':
        return `${this.firstChar(user.patronymic_name).toUpperCase() + this.fromSecondChar(user.patronymic_name).toLowerCase()}`;
      case 'M.':
        return `${this.firstChar(user.patronymic_name).toUpperCase()}.`;
      case 'l':
        return (user.last_name || '').toLowerCase();
      case 'l.':
        return `${this.firstChar(user.last_name).toLowerCase()}.`;
      case 'f':
        return (user.first_name || '').toLowerCase();
      case 'f.':
        return `${this.firstChar(user.first_name).toLowerCase()}.`;
      case 'm':
        return (user.patronymic_name || '').toLowerCase();
      case 'm.':
        return `${this.firstChar(user.patronymic_name).toLowerCase()}.`;
    }
  }

  private firstChar(str) {
    return (str || '').charAt(0);
  }

  private fromSecondChar(str) {
    return (str || '').slice(1);
  }
}
