import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titlePipe' })
export class TitlePipe implements PipeTransform {
    transform(value: string, title: string): string {
        value = value.replace(/[^A-Za-z]/g, " ");
        title = value.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return title;
    }
}

