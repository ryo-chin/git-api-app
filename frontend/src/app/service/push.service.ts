import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private messaging: firebase.messaging.Messaging;
  private db;

  constructor() {
  }


  private prepareMessagingIfNeed() {
    if (!!this.messaging) {
      return;
    }
    this.messaging = firebase.messaging();
  }

  private prepareDBIfNeed() {
    if (!!this.db) {
      return;
    }
    this.db = firebase.firestore();
  }

  getToken() {
    this.prepareMessagingIfNeed();
    this.messaging
      .getToken().then((currentToken) => {
      if (currentToken) {
        this.sendTokenToServer(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  observeUpdateToken() {
    this.prepareMessagingIfNeed();
    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        // Send Instance ID token to app server.
        this.sendTokenToServer(refreshedToken);
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });
  }

  private sendTokenToServer(currentToken: string) {
    this.prepareDBIfNeed();
    const userId = 1; // 一旦、自分が使うだけなので適当なID
    this.db.collection('pushTokens').doc(userId.toString()).set({
      token: currentToken
    }, { merge: true }).then(docRef =>
      console.log('Document written with: ', docRef)
    ).catch(error =>
      console.error('Error adding document: ', error)
    );
  }
}
