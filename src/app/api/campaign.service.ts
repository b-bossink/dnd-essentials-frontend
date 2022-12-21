import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends APIService {

  protected getURL(): string {
    return this.root + "campaign";
  }

}
