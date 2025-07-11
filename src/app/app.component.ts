// src/app/app.component.ts

import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { CommonModule, NgIf } from '@angular/common';
import { ToastsComponent } from './components/toasts/toasts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgIf, RouterLink, ToastsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDark = false; // Flagga för att visa mörkt tema

  isMotion = false; // Flagga för att visa transparent header
  lastScrollTop = 0; // För att hålla koll på senaste scroll-positionen

  isMenuOpen = false;

  constructor(
    public auth: AuthService,
    private theme: ThemeService,
    private router: Router
  ) {}

  // @HostListener lyssnar på scroll-händelsen och uppdaterar isMotion-flaggan
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollY > this.lastScrollTop) {
      // Scrollar nedåt
      this.isMotion = scrollY > 35;
    } else {
      // Scrollar uppåt
      this.isMotion = scrollY > 100;
    }

    this.lastScrollTop = scrollY <= 0 ? 0 : scrollY; // För Safari, scrollY kan bli negativ
  }

  // ngAfterViewInit används för att lägga till event listeners efter att vyn har initierats
  ngAfterViewInit() {
    const collapseEl = document.getElementById('nav');
    if (collapseEl) {
      collapseEl.addEventListener('shown.bs.collapse', () => {
        document.body.style.overflow = 'hidden';
      });
      collapseEl.addEventListener('hidden.bs.collapse', () => {
        document.body.style.overflow = '';
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  ngOnInit() {
    this.theme.init();
    this.isDark = document.body.classList.contains('dark-mode');
  }

  toggleTheme() {
    this.theme.toggle();
    this.isDark = document.body.classList.contains('dark-mode');
  }

  logout(): void {
    // Ta bort token och navigera till login-sidan
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
