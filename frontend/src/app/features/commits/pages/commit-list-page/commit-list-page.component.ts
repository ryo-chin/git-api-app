import { Component, OnInit } from '@angular/core';
import { GithubService, RepositoryModel } from '../../../../service/github-service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-commit-list-page',
  templateUrl: './commit-list-page.component.html',
  styleUrls: ['./commit-list-page.component.scss']
})
export class CommitListPageComponent implements OnInit {
  repositories: RepositoryModel[];

  constructor(
    private githubService: GithubService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.githubService.fetch(user.token, user.userName, user.email, 'master').subscribe(res => {
      this.repositories = res;
    });
  }
}
