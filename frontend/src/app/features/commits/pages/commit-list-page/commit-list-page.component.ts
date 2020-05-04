import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../service/firebase-service';
import { GithubService, RepositoryModel } from '../../../../service/github-service';

@Component({
  selector: 'app-commit-list-page',
  templateUrl: './commit-list-page.component.html',
  styleUrls: ['./commit-list-page.component.scss']
})
export class CommitListPageComponent implements OnInit {
  repositories: RepositoryModel[];

  constructor(
    private firebaseService: FirebaseService,
    private githubService: GithubService
  ) {
  }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');
    this.githubService.fetch(accessToken, username, email, 'master').subscribe(res => {
      console.log(res);
      this.repositories = res;
    });
  }
}
