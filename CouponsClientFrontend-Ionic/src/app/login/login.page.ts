import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Por favor complete todos los campos.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (client) => {
        if (client) {
          this.authService.saveSessionData('client', client);
          window.location.reload();
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
