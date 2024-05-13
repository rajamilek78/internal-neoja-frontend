import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedCommonService {

  private isAuthenticated: boolean = false;

  constructor() {}

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  
}
