import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeUtil } from '../../util/time-util';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  fetch(token: string, username: string, email: string, branch: string) {
    const now = TimeUtil.now();
    const from = formatDate(TimeUtil.addDays(now, -7), GithubGraphQLQuery.TIME_FORMAT, this.locale);
    const to = formatDate(now, GithubGraphQLQuery.TIME_FORMAT, this.locale);
    this.http.post('https://api.github.com/graphql',
      {
        query: GithubGraphQLQuery.commits(username, email, branch, from, to)
      },
      {
        headers: {Authorization: `bearer ${token}`}
      }
    ).subscribe(res => console.log(res));
  }
}

class GithubGraphQLQuery {
  static TIME_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
  static commits(name: string, email: string, branch: string, from: string, to: string) {
    return `{
      user(login: "${name}") {
        contributionsCollection(from: "${from}", to: "${to}") {
          commitContributionsByRepository {
            repository {
              name
              ref(qualifiedName: "${branch}") {
                target {
                  ... on Commit {
                    history(
                      first: 100,
                      author: {emails: ["${email}"]},
                      since: "${from}",
                      until: "${to}"
                    ) {
                      nodes {
                        message
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;
  }
}
