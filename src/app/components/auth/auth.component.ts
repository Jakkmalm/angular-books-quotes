import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isLoginMode) {
      this.auth.login(this.model).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Felaktiga inloggningsuppgifter')
      });
    } else {
      this.auth.register(this.model.username, this.model.password).subscribe({
        next: () => {
          alert('Registrering lyckades! Du kan nu logga in.');
          this.isLoginMode = true;
        },
        error: () => alert('Registreringen misslyckades.')
      });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.model = { username: '', password: '' };  // Rensa fälten
  }
}
