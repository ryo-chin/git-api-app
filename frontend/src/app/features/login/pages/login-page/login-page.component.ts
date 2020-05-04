import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { GithubService } from '../../../../service/github-service';
import OAuthCredential = firebase.auth.OAuthCredential;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private githubService: GithubService
  ) { }

  ngOnInit() {
    firebase.auth().getRedirectResult().then(result => {
      if (!result.credential) {
        return;
      }
      const username = result.additionalUserInfo.username;
      const email = result.user.email;
      const oauthCredential = result.credential as OAuthCredential;
      this.githubService.fetch(oauthCredential.accessToken, username, email, 'master');
    }).catch(error => console.log(error));
  }

  signin() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
}
