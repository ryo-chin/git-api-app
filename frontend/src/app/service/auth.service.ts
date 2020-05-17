import { Injectable } from '@angular/core';
import { authStore, UserInfo } from '../store/auth-store';
import * as firebase from 'firebase';
import OAuthCredential = firebase.auth.OAuthCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  isAuthenticated() {
    return !!authStore.getToken();
  }

  get isAuthenticated$() {
    return authStore.isAuthenticated$;
  }

  authenticateIfSignedIn(callbackFn: () => void) {
    firebase.auth().getRedirectResult().then(result => {
      if (!result.credential) {
        return;
      }
      const oauthCredential = result.credential as OAuthCredential;
      authStore.saveUserInfo({
        userName: result.additionalUserInfo.username,
        email: result.user.email,
        token: oauthCredential.accessToken
      });
      callbackFn();
    }).catch(error => console.log(error));
  }

  signInWithRedirect() {
    return firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider());
  }

  get currentUser(): UserInfo | null {
    return authStore.getUserInfo();
  }

  logout() {
    authStore.clear();
  }
}
