// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // { path: 'login',             component: LoginComponent },
  { path: 'login', component: AuthComponent },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'books/new', component: BookFormComponent, canActivate: [AuthGuard] },
  {
    path: 'books/edit/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'quotes', component: QuotesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/books' },
];
