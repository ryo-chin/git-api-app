import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isAuthenticated$: Observable<boolean>;
  isOpenedNavBar = true;
  isOpenedSettingMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = authService.isAuthenticated$;
  }

  ngOnInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    firebase.initializeApp(environment.firebase);
  }

  toggleNavBar() {
    this.isOpenedNavBar = !this.isOpenedNavBar;
  }

  toggleSettingMenu() {
    this.isOpenedSettingMenu = !this.isOpenedSettingMenu;
  }

  clickNavItem($event: MouseEvent) {
    $event.stopPropagation();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
