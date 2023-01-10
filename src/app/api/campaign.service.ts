import { Injectable } from '@angular/core';
import { Campaign } from '../models';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends APIService {

  protected getURL(): string {
    return this.root + "campaign";
  }

  public async post(campaign: Campaign) {
      return await this.http.post(this.getURL(), campaign, this.reqOptions);
  }

  public async addCharacter(campaign: number, character:number) {
    return await this.http.post(this.getURL() + "/" + campaign + "/add-character/" + character, "", this.reqOptions);
}

  public async get(id: number) {
      return await this.http.get(this.getURL() + "/" + id, this.reqOptions);
  }

  public async delete(id: number) {
    return await this.http.delete(this.getURL() + "/" + id, this.reqOptions);
  }

}
