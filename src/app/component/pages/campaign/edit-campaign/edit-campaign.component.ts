import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../../../api/campaign.service';
import { CharacterService } from '../../../../api/character-service.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {
  campaign: any;
  members: any = [];
  chars: any = [];
  sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private loc: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.setCharacters();
    this.sub = this.route.params.subscribe(async params => {
      let id = +params['id'];
      this.campaign = (await new CampaignService(this.http).get(id)).subscribe(async c => { 
        if (c != null) {
          this.campaign = c 
          this.campaign.characterIDs.forEach(async (id: number) => {
            (await new CharacterService(this.http).get(id)).subscribe(c => this.members.push(c));
          });
        }
      });
    });
  }
  
  charactersForm = this.fb.group({
    characters: this.fb.array<number>([])
  });

  get characters() : FormArray {
    return this.charactersForm.controls["characters"] as FormArray;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onSubmit() {
    this.campaign.characterIds = [];
    (this.charactersForm.value.characters as Array<any>).forEach(async c => {
      (await new CampaignService(this.http).addCharacter(this.campaign.id, Number(c.character))).subscribe(res => {
      });
    });
  }

  addCharacter() {
    const charForm = this.fb.group({
      character: this.chars[0].id
    });
  
    this.characters.push(charForm);
  }

  async setCharacters() {
    (await new CharacterService(this.http).getAll()).subscribe({
      next: async (res) => {
        this.chars = res;
      },
      error: async (res) => {
        alert('Something went wrong while trying to retrieve available characters');
      }
    });
  }

  includesCharacter(id: number) : boolean {
    let res = false;
    this.campaign.characterIds.forEach((c: number) => res = c === id);
    return res;
  }
}
