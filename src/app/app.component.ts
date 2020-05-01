import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    firebase.initializeApp(environment.firebase);
  }
}
