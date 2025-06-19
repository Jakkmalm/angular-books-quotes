import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  published: string;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  // private apiUrl = 'https://localhost:7267/api/books';
  private readonly apiUrl = `${environment.apiBaseUrl}/books`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }
  update(book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${book.id}`, book);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
