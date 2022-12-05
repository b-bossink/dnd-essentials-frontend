import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/api/authentication-service.service';
import { APIService } from 'src/app/api/api-service';

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
    new AuthenticationService(this.http).login(credentials).subscribe(s => {
    
      if (s instanceof Error) {
        alert("An error occurred. Please try again.");
        return;
      }

      if (s) {
        this.loc.back();
      } else alert("Invalid credentials.");

    });
  }
  

}
