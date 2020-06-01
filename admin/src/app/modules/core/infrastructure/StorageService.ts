import { Injectable } from "@angular/core";

// todo
// class FallbackStorage {
//   setItem
// }

@Injectable()
export class StorageService {
  private isAvailable: boolean;
  private storage: Storage;

  constructor() {
    this.isAvailable = this.isClientSupportsLocalStorage();
    if (this.isAvailable) {
      this.storage = window.localStorage;
    }
  }

  setItem(key: string, item: any): void {
    this.storage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  private isClientSupportsLocalStorage(): boolean {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
}
