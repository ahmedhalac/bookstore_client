import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  sortArrayById<T extends { id: number }>(array: T[]): T[] {
    return array.sort((a, b) => a.id - b.id);
  }
}
