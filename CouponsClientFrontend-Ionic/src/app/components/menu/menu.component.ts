import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  usuario: any;

  constructor(private menuController: MenuController, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
   // this.usuario = await this.authService.getSessionData('user');
  }

  closeMenu() {
    this.menuController.close();
  }

  logout() {
    this.authService.logout();
  }
}
