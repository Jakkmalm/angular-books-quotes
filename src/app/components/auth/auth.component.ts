import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, LoginDto } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  model: LoginDto = {
    username: '',
    password: '',
  };

  isLoginMode = true;
  loading = false; // Flagga för att visa laddningsindikator

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.loading = true; // Sätt flaggan till true när inloggning/registrering påbörjas
    if (this.isLoginMode) {
      this.auth.login(this.model).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/books']);
        },
        error: () => {
          this.loading = false;
          alert('Felaktiga inloggningsuppgifter');
        },
      });
    } else {
      this.auth.register(this.model.username, this.model.password).subscribe({
        next: (res) => {
          console.log('Register response:', res);
          this.loading = false;
          this.snackBar.open(
            'Registrering lyckades! Du kan nu logga in.',
            'Stäng',
            { duration: 3000 }
          );
          this.isLoginMode = true;
          this.router.navigate(['/login']); // Navigera till inloggningssidan
        },
        error: (err) => {
          console.error('Register error:', err);
          this.loading = false;
          this.snackBar.open('Registreringen misslyckades.', 'Stäng', {
            duration: 3000,
          });
        },
      });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.model = { username: '', password: '' }; // Rensa fälten
  }
}
