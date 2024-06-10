import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7125/api/Client'; // URL de la API

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  encryptPassword(password: string): string {
    const rsa = forge.pki.rsa;
    const publicKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5G/6kK8Y8WV2H5aKZow+
    HyldgnOnOWb99SjdJzgbzQ+gxeMEk2D0zpqWxDCYQJdBzHgGllxszRMeV/81H/S1
    Kaf3hx3EqaAYm7tWUM1HQ+13PQ6G/QIYVz0XSLuV2qGoF1EwskAxnJ/xIMJbF2yZ
    4mTXJ+76gNcHTI2YqfLZsDxi7bXjuS2bBxyk7Fd3M3QZ+vvk6G3f3ZepHJynY4Bz
    jqkJEFnbRj02erBk4ukGmf0x0+/rYDFEBiUIh19FY3lq2BDQzYrkTSmNexqT1ZVP
    xz2uCuB+frH8AI9V0l45SAoQL1AORQpzrjzToGJJxCCMDbI0i5BbOSleMHF2+RIt
    VwIDAQAB
    -----END PUBLIC KEY-----`);
    const encrypted = publicKey.encrypt(password);
    return forge.util.encode64(encrypted);
  }

  register(client: any) {
    const encryptedPassword = this.encryptPassword(client.password);
    client.password = encryptedPassword;
    return this.http.post(`${this.apiUrl}/register`, client);
  }

  login(email: string, password: string) {
    const encryptedPassword = this.encryptPassword(password);
    return this.http.post(`${this.apiUrl}/signIn`, { email, password: password });
  }

  async saveSessionData(key: string, data: any): Promise<void> {
    await this.storage.set(key, data);
  }

  async getSessionData(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  async logout(): Promise<void> {
    await this.storage.remove('user');
    // await this.storage.remove('cart');
  }
}
