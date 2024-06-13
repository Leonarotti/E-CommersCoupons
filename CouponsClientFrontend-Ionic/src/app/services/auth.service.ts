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
const encrypted = publicKey.encrypt(password, 'RSA-OAEP', {
  md: forge.md.sha256.create()
});
return forge.util.encode64(encrypted);
}

  register(client: any) {
    let clientCopy = { ...client };
    const encryptedPassword = this.encryptPassword(client.password);
    clientCopy.password = encryptedPassword;
    return this.http.post(`${this.apiUrl}/register`, clientCopy);
  }

  login(email: string, password: string) {
    const encryptedPassword = this.encryptPassword(password);
    console.log(encryptedPassword);
    return this.http.post(`${this.apiUrl}/signIn`, { email, password: encryptedPassword });
  }

  async saveSessionData(key: string, data: any): Promise<void> {
    await this.storage.set(key, data);
  }

  async getSessionData(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  async logout(): Promise<void> {
    await this.storage.remove('client');
    await localStorage.removeItem('cart');
  }

  async isLoggedIn(): Promise<boolean> {
    const client = await this.getSessionData('client');
    return client !== null;
  }
}
