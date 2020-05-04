import { PipeTransform, Pipe } from '@angular/core';

export function truncateString(text: string, max: number) {
  return text && text.length > max ? text.substring(0, max) + '...' : text;
}

@Pipe({ name: 'udTruncate' })
export class UDTruncatePipe implements PipeTransform {
  transform(text: string, max: number): string {
    return truncateString(text, max);
  }
}
