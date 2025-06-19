// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Toast {
  text:      string;
  classname: string;
  delay:     number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private subject = new Subject<Toast>();

  /** Komponenter prenumererar på den här för att visa nya toasts */
  get onToast$(): Observable<Toast> {
    return this.subject.asObservable();
  }

  /**
   * Skicka ett nytt toast-meddelande
   * @param text      Den text som ska visas
   * @param classname Bootstrap-CSS-klass för bakgrund/färg (t.ex. 'bg-success text-white')
   * @param delay     Hur länge (ms) det ska ligga framme
   */
  show(text: string, classname = 'bg-info text-white', delay = 5000): void {
    this.subject.next({ text, classname, delay });
  }
}
// Denna tjänst hanterar toast-meddelanden i applikationen.
// Den använder en Subject för att skicka meddelanden som komponenter kan prenumerera på.