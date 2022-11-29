import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends APIService {
    public async login(credentials: { name: string, password: string }) {
      return this.http.post(this.getURL() + `/login?usernameOrEmail=${credentials.name}&password=${credentials.password}`,
        credentials);
    }

    public async register(credentials: {username: string, email: string, password: string}) : Promise<Observable<any>>{
      if (!this.valid(credentials.password)) {
          return of(false);
      }
      return await this.http.post(this.getURL() + "/register", credentials);
    }

    protected getURL(): string {
      return this.root + "authentication";
    }

    private valid(password: string) : boolean {
      return /\d/.test(password) && /[A-Z]/.test(password); 
    }

}
