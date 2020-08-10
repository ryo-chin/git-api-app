import { Injectable } from '@angular/core';
import { authStore, UserInfo } from '../store/auth-store';
import * as firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map, tap } from 'rxjs/operators';
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

  get isLoading$() {
    return authStore.isLoading$;
  }

  authenticateIfSignedIn(): Observable<void> {
    authStore.setLoading(true);
    return from(firebase.auth().getRedirectResult())
      .pipe(
        filter(res => !!res.credential),
        map(res => ({
          userId: res.user.uid,
          userName: res.additionalUserInfo.username,
          email: res.user.email,
          token: (res.credential as OAuthCredential).accessToken
        })),
        tap(user => authStore.saveUserInfo(user)),
        catchError(error => {
          console.log(error);
          return of(error);
        }),
        finalize(() => authStore.setLoading(false))
      );
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
