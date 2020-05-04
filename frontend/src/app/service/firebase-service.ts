import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {
  }

  singnInWithRedirect() {
    return firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider());
  }
}
