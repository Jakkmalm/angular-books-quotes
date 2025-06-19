// src/app/components/book-list/book-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BookService, Book } from '../../services/book.service';
import { ToastService } from '../../services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true; // Flagga för att visa laddningsindikator
  constructor(
    private bookService: BookService,
    public router: Router, // public så att du kan använda router.navigate(...) i templaten
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true; // ★
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false; // ★
      },
      error: (err) => {
        console.error('Kunde inte hämta böcker', err);
        this.toast.show('Kunde inte ladda böcker.', 'bg-danger text-white');
        this.loading = false; // ★
      },
    });
  }

  edit(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }

  delete(id: number): void {
    // Visa en SweetAlert2-dialog i stället för window.confirm
    Swal.fire({
      title: 'Är du säker?',
      text: 'Boken kommer att tas bort permanent!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, ta bort!',
      cancelButtonText: 'Avbryt',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.delete(id).subscribe({
          next: () => {
            this.toast.show('Bok borttagen!', 'bg-warning text-dark');
            this.loadBooks();
          },
          error: (err) => {
            console.error('Kunde inte ta bort bok', err);
            this.toast.show(
              'Kunde inte ta bort boken.',
              'bg-danger text-white'
            );
          },
        });
      }
    });
  }
}
