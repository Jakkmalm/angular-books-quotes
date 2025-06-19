// src/app/components/book-form/book-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  private bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bs: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      published: ['', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.bookId = +idParam;
      this.bs.getById(this.bookId).subscribe((book) => {
        // FormControl expects string for date input
        this.form.patchValue({
          ...book,
          published: book.published.split('T')[0],
        });
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.show(
        'Fyll i alla obligatoriska fält.',
        'bg-warning text-dark'
      );
      return;
    }
    const dto: Book = {
      ...this.form.value,
      published: new Date(this.form.value.published).toISOString(),
    };
    if (this.isEdit && this.bookId != null) {
      dto.id = this.bookId;
      this.bs.update(dto).subscribe({
        next: () => {
          this.toast.show('Bok uppdaterad!', 'bg-success text-white');
          this.router.navigate(['/books']);
        },
        error: () => {
          this.toast.show(
            'Kunde inte uppdatera boken.',
            'bg-danger text-white'
          );
        },
      });
    } else {
      this.bs.create(dto).subscribe({
        next: () => {
          this.toast.show('Bok skapad!', 'bg-success text-white');
          this.router.navigate(['/books']);
        },
        error: () => {
          this.toast.show('Kunde inte skapa boken.', 'bg-danger text-white');
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
// This component handles both creating and editing books.
// It uses Angular's Reactive Forms to manage the form state and validation.
