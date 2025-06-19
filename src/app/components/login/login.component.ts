// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginDto } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // modellen som binder till dina input-fält
  model: LoginDto = {
    username: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // den här metoden anropas av (ngSubmit)
  onSubmit(): void {
    this.auth.login(this.model).subscribe({
      next: () => {
        // navigera till böcker om inloggningen lyckas
        this.router.navigate(['/books']);
      },
      error: () => {
        alert('Felaktiga inloggningsuppgifter');
      }
    });
  }
}
