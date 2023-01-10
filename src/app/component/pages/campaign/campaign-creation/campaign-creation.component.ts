import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaignService } from '../../../../api/campaign.service';
import { CharacterService } from '../../../../api/character-service.service';
import { StorageKeys } from '../../../../storage-keys';

@Component({
  selector: 'app-campaign-creation',
  templateUrl: './campaign-creation.component.html',
  styleUrls: ['./campaign-creation.component.css']
})
export class CampaignCreationComponent implements OnInit {

  chars: any[] = [];

  charactersForm = this.fb.group({
    characters: this.fb.array<number>([])
  });

  get characters() : FormArray {
    return this.charactersForm.controls["characters"] as FormArray;
  }

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setCharacters();
  }

  async onSubmit(campaign: {
    name: string, ownerId: number, characterIds: number[]
  }) {
    campaign.ownerId = Number(localStorage.getItem(StorageKeys.userId));
    campaign.characterIds = [];
    (this.charactersForm.value.characters as Array<any>).forEach(c => {
      campaign.characterIds.push(Number(c.character));
    });
      console.log(campaign);
    (await new CampaignService(this.http).post(campaign)).subscribe({
      next: async (res) => {
        await this.router.navigate(['campaign']);
      },
      error: async (err) => {
        let msg: string = "Unknown error occured";
        if (err.status == 404) {
          msg = "The owner does not exist.";
        } else if (err.status == 422) {
          msg = "Some data was invalid.";
        } else if (err.status == 500) {
          msg = "Internel server error.";
        }
        alert("An error occured while creating character. \n" + msg + ` (${err.status})`);
      }
    }
    );
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
        alert('Something went wrong while trying to the retrieve available characters');
      }
    });
  }

}
