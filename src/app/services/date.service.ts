import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  
  constructor() { }

  validateDate(date: Date): boolean {
    var today = new Date("1920-01-01");
    if (date.getFullYear() >= today.getFullYear() && date.getFullYear().toString().length === 4) {
      return true;
    } else {
      return false;
    }
  }
}
