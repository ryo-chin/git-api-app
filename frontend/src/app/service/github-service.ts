import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(
    private http: HttpClient,
  ) {
  }

  fetchCommits(token: string, username: string, email: string, condition: RepositorySearchCondition) {
    return this.http.post<CommitsQueryResponse>('https://api.github.com/graphql',
      {
        query: GithubGraphQLQuery.commits(username, email, condition.branch, condition.from, condition.to)
      },
      {
        headers: {Authorization: `bearer ${token}`}
      }
    ).pipe(map(res => {
      return res.data.user.contributionsCollection.commitContributionsByRepository
        .map(contribution => {
          return new RepositoryModel(
            contribution.repository.name,
            contribution.repository?.ref.target.history.nodes.map(node => new CommitModel(
              node.message,
              node.messageBody,
              node.commitUrl,
              node.committedDate
            ))
          );
        });
    }));
  }
}

export class RepositorySearchCondition {
  from: string;
  to: string;

  constructor(
    readonly locale: string,
    readonly fromDate: Date,
    readonly toDate: Date,
    readonly branch: string = 'master'
  ) {
    this.from = this.formatDate(fromDate);
    this.to = this.formatDate(toDate);
  }

  private formatDate(now) {
    return formatDate(now, GithubGraphQLQuery.TIME_FORMAT, this.locale);
  }
}

export class RepositoryModel {
  constructor(
    readonly name: string,
    readonly commits: CommitModel[]
  ) {
  }
}

export class CommitModel {
  constructor(
    readonly message: string,
    readonly messageBody: string,
    readonly commitUrl: string,
    readonly committedDate: string
  ) {
  }
}

type CommitsQueryResponse = {
  data: {
    user: {
      contributionsCollection: {
        commitContributionsByRepository: {
          repository: {
            name: string, ref: {
              target: {
                history: {
                  nodes: {
                    message: string,
                    messageBody: string,
                    commitUrl: string,
                    committedDate: string
                  }[]
                }
              }
            }
          }
        }[]
      }
    }
  }
};

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
                        messageBody
                        commitUrl
                        committedDate
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
