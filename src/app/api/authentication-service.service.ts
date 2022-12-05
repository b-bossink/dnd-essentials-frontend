import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends APIService {
    public login(credentials: { name: string, password: string }) {
      var result = new Subject<boolean | Error>();
      this.http.post<LoginResponse>(this.getURL() + `/login?usernameOrEmail=${credentials.name}&password=${credentials.password}`,
        credentials).subscribe({next: res => {
          if (res.success) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.userInfo.username);
            localStorage.setItem("userid", res.userInfo.id.toString());
            result.next(true);
          } else {
            result.next(false);
          }
        },
      error: err => result.next(err)
    });
      return result.asObservable();
    }

    public static isLoggedIn() {
      return localStorage.getItem("token") != null;
    }

    public async logout() {
      localStorage.clear();
    }

    public register(credentials: {username: string, email: string, password: string}) {
      if (!this.valid(credentials.password)) {
          return of(false);
      }
      return this.http.post(this.getURL() + "/register", credentials);
    }

    protected getURL(): string {
      return this.root + "authentication";
    }

    private valid(password: string) : boolean {
      return /\d/.test(password) && /[A-Z]/.test(password); 
    }

}

interface LoginResponse {
  success: boolean;
  token: string;
  userInfo: {
    id: number;
    username: string;
    emailaddress: string;
  }
}
