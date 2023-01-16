import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  public isDarkMode: boolean = false; // déclaration de la variable isDarkMode

  constructor() { }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

}
