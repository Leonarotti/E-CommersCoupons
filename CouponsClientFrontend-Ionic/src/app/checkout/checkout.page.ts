import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as forge from 'node-forge';
import { AuthService } from '../services/auth.service';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutForm: FormGroup;
  totalWithTax: number = 0;
  clientId: number = 0;
  isToastOpen = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private saleService: SaleService) {
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
        couponsSale: this.loadCart(),
      };

      console.log(saleData);

      this.saleService.processSale(saleData).subscribe(response => {
        console.log(response);
        localStorage.removeItem('cart');
        this.showSuccessToast();
      }, error => {
        console.log(error);
      });
    }
  }

  async loadClientId() {
    this.clientId = (await this.authService.getSessionData('client')).clientId;
  }

  loadCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  encryptCardNumber(cardNumber: string): string {
    const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqhNIV5l2G7y/enk+qDu8
VA0LD2dOTHlzrMFH+a4PIK1kWhxnWWoN6N1wOBrz7haa7nf6WFSt9run2GfaIRxx
10Ax2YUoLs1QkkzjouuBv1/pvR6hBtvQ7bjTrJTyYiHO2CXn6lPeqxHgK5Aizrls
6BYqjR6+/cjunr0U+u3oyBc+0oITBFGOqGBX36QTKbm54oO9NevpzZEPh+aCmOEW
fVBUxRoU9U7QuFObr72VLQdcNw2JK2TYKOdTRnG1waL+ZgCaFjtJzbrb3xGCLCni
0FyVKPuTbVUPaWKIvIetx6abIOQENF25QuZGGY6XUFYYC8O+u1eDHsSJ924qo3ZI
SQIDAQAB
-----END PUBLIC KEY-----
`;
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(cardNumber, 'RSA-OAEP', {
      md: forge.md.sha256.create()
    });
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

  showSuccessToast() {
    this.isToastOpen = true;
  }

  handleToastButtonClick() {
    this.isToastOpen = false;
    this.router.navigate(['/home']);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
