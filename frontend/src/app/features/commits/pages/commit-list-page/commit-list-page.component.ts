import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { GithubService, RepositoryModel, RepositorySearchCondition } from '../../../../service/github-service';
import { AuthService } from '../../../../service/auth.service';
import { RepositorySearchForm } from './form/repository-search.form';
import { TimeUtil } from '../../../../../util/time-util';
import { UserInfo } from '../../../../store/auth-store';
import { SelectItem } from '../../../../ui-libs/model/select-item';

@Component({
  selector: 'app-commit-list-page',
  templateUrl: './commit-list-page.component.html',
  styleUrls: ['./commit-list-page.component.scss']
})
export class CommitListPageComponent implements OnInit {
  repositories: RepositoryModel[];
  form: RepositorySearchForm;
  dateRanges: SelectItem[];
  selectedRange: SelectItem;
  yearRange: string;
  loading = false;

  constructor(
    private githubService: GithubService,
    private authService: AuthService,
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  ngOnInit(): void {
    this.form = new RepositorySearchForm();
    this.dateRanges = this.form.selectableDateRanges;
    this.selectedRange = this.form.selectableDateRanges[0]; // TODO: 選択中アイテムとFormの兼ね合いをどうするかは要検討
    const currentYear = TimeUtil.now().getFullYear();
    this.yearRange = `${currentYear - 1}:${currentYear}`;
    this.fetch(this.form.toInput(this.locale), this.authService.currentUser);
  }

  submit() {
    this.fetch(this.form.toInput(this.locale), this.authService.currentUser);
  }

  private fetch(input: RepositorySearchCondition, user: UserInfo) {
    if (!user) {
      return;
    }
    this.loading = true;
    this.githubService.fetchCommits(user.token, user.userName, user.email, input).subscribe(res => {
      this.repositories = res;
      this.loading = false;
    });
  }
}
