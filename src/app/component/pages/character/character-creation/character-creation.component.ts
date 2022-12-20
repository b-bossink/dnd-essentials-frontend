import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/api/character-service.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent implements OnInit {
  owner = 0;
  races = [];
  classes = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.allRacesAndClasses();
  }

  async onSubmit(character: {
    name: string, ownerId: number, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number}) {
    character.ownerId = Number(localStorage.getItem("userid"));
    (await new CharacterService(this.http).post(character)).subscribe({
      next: async (res) => {
        await this.router.navigate(['character']);
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

  private async allRacesAndClasses() {
    (await new CharacterService(this.http).getAllRaces()).subscribe({
      next: r => this.races = r
    });

    (await new CharacterService(this.http).getAllClasses()).subscribe({
      next: c => this.classes = c
    });
  }

}
