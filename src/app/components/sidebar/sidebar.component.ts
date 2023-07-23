import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isUserLoggedIn:BehaviorSubject<boolean> = this.authservice.isUserLogged;

  constructor(private authservice: AuthService) {
  }

  logout() {
    this.authservice.logout();
  }
}
