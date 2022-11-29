import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NotificationService } from './api/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DND Essentials';


  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.startConnection();
    this.notificationService.addListener(); 
  }
}
