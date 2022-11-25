import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/api/character-service.service';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  character: any;
  private sub: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      let id = +params['id'];
      this.character = (await new CharacterService(this.http).get(id)).subscribe(c => this.character = c);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onSubmit(character: {
    name: string, ownerId: number, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number
  }) {
    character.ownerId = 1;
    console.log(character);
    (await new CharacterService(this.http).update(this.character.id, character)).subscribe({
      next: async res => await this.router.navigate(['character']),
      error: async err => {
        let msg: string = "Unknown error occured";
        if (err.status == 404) {
          msg = "This character does not exist.";
        } else if (err.status == 422) {
          msg = "Some data was invalid.";
        } else if (err.status == 500) {
          msg = "Internel server error."
        }
        alert("An error occured while creating character. \n" + msg + ` (${err.status})`);
      }
    }
    );
  }
}
