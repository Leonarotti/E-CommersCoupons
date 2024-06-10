import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  client = {
    dni: '',
    name: '',
    lastname: '',
    birth_date: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.client).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error de registro:', error);
      }
    );
  }

  clearFields() {
    this.client.dni = '';
    this.client.name = '';
  }
}
