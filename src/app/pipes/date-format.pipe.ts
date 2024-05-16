import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, format: string = 'dd-MM-yyyy'): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-based
    const year = date.getFullYear();

    if (format === 'dd-MM-yyyy') {
      return `${day}-${month}-${year}`;
    }

    return date.toDateString(); // default fallback
  }

  parse(value: string, format: string = 'dd-MM-yyyy'): Date {
    if (!value) return new Date();

    if (format === 'dd-MM-yyyy') {
      const [day, month, year] = value.split('-').map(Number);
      return new Date(year, month - 1, day);
    }

    return new Date(value); // default fallback
  }
}
