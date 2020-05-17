import { BehaviorSubject, Observable } from 'rxjs';

export class AuthStore {
  TOKEN_KEY = 'token';
  USER_NAME_KEY = 'userName';
  EMAIL_KEY = 'email';
  private _isAuthenticated$ = new BehaviorSubject(false);
  private _isLoading$ = new BehaviorSubject(false);

  constructor() {
    this._isAuthenticated$.next(!!this.getToken());
  }

  saveUserInfo(info: UserInfo) {
    this.setItem(this.TOKEN_KEY, info.token);
    this.setItem(this.EMAIL_KEY, info.email);
    this.setItem(this.USER_NAME_KEY, info.userName);
    this._isAuthenticated$.next(true);
  }

  getUserInfo(): UserInfo | null {
    if (!this.getToken()) {
      return null;
    }
    return {
      userName: this.getItem(this.USER_NAME_KEY),
      email: this.getItem(this.EMAIL_KEY),
      token: this.getToken()
    } as UserInfo;
  }

  getToken() {
    return this.getItem(this.TOKEN_KEY);
  }

  private getItem(key: string): string {
    return localStorage.getItem(key);
  }

  private setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  clear() {
    localStorage.clear();
    this._isAuthenticated$.next(false);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$;
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$;
  }

  setLoading(loading: boolean) {
    this._isLoading$.next(loading);
  }
}

export type UserInfo = {
  userName: string,
  email: string,
  token: string
};

export const authStore = new AuthStore();
