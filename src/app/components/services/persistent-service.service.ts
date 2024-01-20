import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistentServiceService {

  constructor() { }

  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  get(key: string): unknown {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  }
}
