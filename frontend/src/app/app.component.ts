import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isOpenedNavBar = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
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

  clickNavItem($event: MouseEvent) {
    $event.stopPropagation();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
