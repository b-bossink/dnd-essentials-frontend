import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/api/authentication-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {
  }


  async onSubmit(credentials: { username: string, email: string, password: string }) {
    new AuthenticationService(this.http).register(credentials).subscribe({
      next: async (res) => 
        await this.router.navigate(['login']),
      error: async (err) => 
        alert("An error occurred. Please try again."),
      
    });
  }

}
