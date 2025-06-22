import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, LoginDto } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  model: LoginDto = {
    username: '',
    password: ''
  };

  isLoginMode = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.isLoginMode) {
      this.auth.login(this.model).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Felaktiga inloggningsuppgifter')
      });
    } else {
      this.auth.register(this.model.username, this.model.password).subscribe({
        next: (res) => {
          console.log('Register response:', res);
          this.snackBar.open('Registrering lyckades! Du kan nu logga in.', 'Stäng', { duration: 3000 });
          this.isLoginMode = true;
          this.router.navigate(['/login']);  // Navigera till inloggningssidan
        },
        error: (err) => {
          console.error('Register error:', err);
          this.snackBar.open('Registreringen misslyckades.', 'Stäng', { duration: 3000 });
        }
      });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.model = { username: '', password: '' };  // Rensa fälten
  }
}
