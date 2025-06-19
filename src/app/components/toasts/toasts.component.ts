// src/app/components/toasts/toasts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Rendera bara när det finns minst ett toast -->
    <div
      *ngIf="toasts.length > 0"
      aria-live="polite"
      aria-atomic="true"
      class="position-fixed top-0 start-50 translate-middle-x p-3"
      style="z-index: 1200; width: 300px; pointer-events: none;"
    >
      <ng-container *ngFor="let t of toasts">
        <!-- Ge varje toast egna pointer-events så knappar inuti funkar -->
        <div
          class="toast show {{ t.classname }}"
          role="alert"
          style="pointer-events: auto;"
        >
          <div class="toast-body">{{ t.text }}</div>
        </div>
      </ng-container>
    </div>
  `,
})
export class ToastsComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.onToast$.subscribe((t) => {
      this.toasts.push(t);
      // Ta bort efter t.delay ms
      timer(t.delay).subscribe(
        () => (this.toasts = this.toasts.filter((x) => x !== t))
      );
    });
  }
}
// Denna komponent visar toast-meddelanden som skickas via ToastService
