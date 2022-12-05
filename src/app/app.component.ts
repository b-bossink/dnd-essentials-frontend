import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NotificationService } from './api/notification/notification.service';
import { LoginComponent } from './component/pages/login/login.component';
import { AuthenticationService } from './api/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DND Essentials';

  constructor(public notificationService: NotificationService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.notificationService.startConnection();
    this.notificationService.addListener();
  }

  //title bar info / functions

  isLoggedIn() {
    return localStorage.getItem("token") != null;
  }

  username() {
    return localStorage.getItem("username");
  }

  logout() {
    new AuthenticationService(this.httpClient).logout();
    window.location.reload();
  }
}
