import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as forge from 'node-forge';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutForm: FormGroup;
  totalWithTax: number = 0;
  clientId: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.checkoutForm = this.fb.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, this.luhnValidator]],
      expiryDate: ['', [Validators.required, this.expiryDateValidator]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.totalWithTax = navigation.extras.state['totalWithTax'];
    }
  }

  ngOnInit() {
    this.loadClientId();
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formValues = this.checkoutForm.value;
      const encryptedCardNumber = this.encryptCardNumber(formValues.cardNumber);

      const saleData = {
        clientId: this.clientId,
        cardNumber: encryptedCardNumber,
        totalAmount: this.totalWithTax,
        cart: this.loadCart(),
      };

      console.log(saleData);

      // Lógica para enviar los datos de la compra al servidor
      // this.purchaseService.processPurchase(purchaseData).subscribe(response => {
      //   // Manejar la respuesta del servidor
      // });
    }
  }

  async loadClientId() {
    this.clientId = (await this.authService.getSessionData('client')).clientId;
  }

  loadCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  
  encryptCardNumber(cardNumber: string): string {
    const publicKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5G/6kK8Y8WV2H5aKZow+
      HyldgnOnOWb99SjdJzgbzQ+gxeMEk2D0zpqWxDCYQJdBzHgGllxszRMeV/81H/S1
      Kaf3hx3EqaAYm7tWUM1HQ+13PQ6G/QIYVz0XSLuV2qGoF1EwskAxnJ/xIMJbF2yZ
      4mTXJ+76gNcHTI2YqfLZsDxi7bXjuS2bBxyk7Fd3M3QZ+vvk6G3f3ZepHJynY4Bz
      jqkJEFnbRj02erBk4ukGmf0x0+/rYDFEBiUIh19FY3lq2BDQzYrkTSmNexqT1ZVP
      xz2uCuB+frH8AI9V0l45SAoQL1AORQpzrjzToGJJxCCMDbI0i5BbOSleMHF2+RIt
      VwIDAQAB
      -----END PUBLIC KEY-----`);
    const encrypted = publicKey.encrypt(cardNumber, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  }

  luhnValidator(control: FormControl): ValidationErrors | null {
    const value = control.value.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0 ? null : { luhn: true };
  }

  expiryDateValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const match = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.exec(value);
    if (!match) {
      return { expiryDate: true };
    }
    const expMonth = parseInt(match[1], 10);
    const expYear = parseInt('20' + match[2], 10);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return { expiryDate: true };
    }
    return null;
  }

}
