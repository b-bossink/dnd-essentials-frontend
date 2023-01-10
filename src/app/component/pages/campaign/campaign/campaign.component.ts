import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../../../api/campaign.service';
import { CharacterService } from '../../../../api/character-service.service';
import { UserService } from '../../../../api/user-service.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaign: any;
  members: any = [];
  ownerName!: string;
  sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private loc: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      let id = +params['id'];
      this.campaign = (await new CampaignService(this.http).get(id)).subscribe(async c => { 
        if (c != null) {
          this.campaign = c 
          new UserService(this.http).get(this.campaign.ownerID).subscribe(u => this.ownerName = u.username);
          this.campaign.characterIDs.forEach(async (id: number) => {
            (await new CharacterService(this.http).get(id)).subscribe(c => this.members.push(c));
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async delete() {
    const c = confirm("Are you sure you want to delete the campaign '" + this.campaign.name + "'?");
    if (c) {
      (await new CampaignService(this.http).delete(this.campaign.id)).subscribe(
        async res => {
        this.loc.back();
      });
    }
  }

}
