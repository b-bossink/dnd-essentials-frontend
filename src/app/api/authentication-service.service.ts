import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends APIService {
    public async login(credentials: { name: string, password: string }) {
      return this.http.post(this.getURL() + `/login?usernameOrEmail=${credentials.name}&password=${credentials.password}`,
        credentials);
    }

    public async register(credentials: {username: string, email: string, password: string}) {
      return await this.http.post(this.getURL() + "/register", credentials);
    }

    protected getURL(): string {
      return this.root + "authentication";
    }

}
