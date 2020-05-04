import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { GithubService } from '../../../../service/github-service';
import { FirebaseService } from '../../../../service/firebase-service';
import { Router } from '@angular/router';
import OAuthCredential = firebase.auth.OAuthCredential;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private githubService: GithubService,
    private router: Router
  ) {
  }

  ngOnInit() {
    firebase.auth().getRedirectResult().then(result => {
      if (!result.credential) {
        return;
      }
      const oauthCredential = result.credential as OAuthCredential;
      localStorage.setItem('accessToken', oauthCredential.accessToken);
      localStorage.setItem('username', result.additionalUserInfo.username);
      localStorage.setItem('email', result.user.email);
      this.router.navigateByUrl('commits');
    }).catch(error => console.log(error));
  }

  signin() {
    this.firebaseService.singnInWithRedirect();
  }
}
