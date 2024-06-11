import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  client: any;

  constructor(private menuController: MenuController, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    this.client = await this.authService.getSessionData('client');
  }

  closeMenu() {
    this.menuController.close();
  }

  logout() {
    this.authService.logout();
    this.client = null;
  }

}
