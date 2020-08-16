import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = authService.isLoading$;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('commits');
      return;
    }
    this.authService.authenticateIfSignedIn().subscribe(success => {
      if (success) {
        this.router.navigateByUrl('commits');
      }
    });
  }

  signin() {
    this.authService.signInWithRedirect();
  }
}
