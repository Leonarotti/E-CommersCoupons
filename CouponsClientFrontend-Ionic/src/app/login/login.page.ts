import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Por favor complete todos los campos.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (usuario) => {
        if (usuario) {
          this.authService.saveSessionData('user', usuario);
          this.router.navigate(['/home']);
        } else {
          alert('Correo electrónico o contraseña incorrectos.');
        }
      },
      (error) => {
        alert('Correo electrónico o contraseña incorrectos.');
      }
    );
  }
}
