// src/app/services/theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private key = 'dark-mode-enabled';

  /**
   * Initierar temat baserat på tidigare sparat värde i localStorage.
   * Om inget är sparat, används standardläget (ljust).
   */
  init(): void {
    const stored = localStorage.getItem(this.key);
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored !== null ? stored === 'true' : prefers;
    document.body.classList.toggle('dark-mode', isDark);
  }

  /**
   * Växlar mellan ljust och mörkt läge.
   * Lägger till/tar bort CSS-klassen på <body> och sparar i localStorage.
   */
  toggle(): void {
    const now = document.body.classList.toggle('dark-mode');
    localStorage.setItem(this.key, now.toString());
  }
}
// Denna tjänst hanterar växling mellan ljus och mörk design i applikationen.
// Den sparar användarens val i localStorage så att det kvarstår vid omladdning av sidan.