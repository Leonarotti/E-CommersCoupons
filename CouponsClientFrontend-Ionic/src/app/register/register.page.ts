import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  isToastOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{4}-\d{4}$/)]],
      name: ['', [Validators.required, Validators.maxLength(11)]],
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      birth_date: ['', [Validators.required, this.ageValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          if (response) {
            this.setOpen(true);
            this.router.navigate(['/login']);
          } else {
            console.log(this.registerForm.value);
          }
        },
        (error) => {
          console.error('Error de registro:', error);
        }
      );
    }
  }

  clearFields() {
    this.registerForm.reset();
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[@#$%^&*.,!]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
    if (!passwordValid) {
      return { invalidPassword: true };
    }
    return null;
  }

  ageValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (age < 0 || (age===0 && month === 0 && today.getDate() < birthDate.getDate())) {
      return { invalidAge: true };
    }
    return age >= 18 ? null : { invalidAge: true };
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}