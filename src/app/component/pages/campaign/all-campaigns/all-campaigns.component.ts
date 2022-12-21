import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user-service.service';
import { StorageKeys } from 'src/app/storage-keys';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.css']
})
export class AllCampaignsComponent implements OnInit {

  campaigns: any;
  private http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  async ngOnInit() {
    new UserService(this.http).getCampaigns(Number(localStorage.getItem(StorageKeys.userId))).subscribe({
      next: c => this.campaigns = c,
      error: err => alert("Failed to load campaigns: " + err.message)
    });
  }

}
