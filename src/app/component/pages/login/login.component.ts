import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/api/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private http: HttpClient;

  constructor(private httpClient: HttpClient, private loc: Location) {
    this.http = httpClient;
   }

  async onSubmit(credentials: {name: string, password: string}) {
    (await new AuthenticationService(this.http).login(credentials)).subscribe({
      next: async (res) => {
        if (res) {
          await this.loc.back();
        } else alert("Invalid credentials.");
      },
      error: async (err) => {
        alert("An error occurred. Please try again.");
      },
    });;
  }

}
