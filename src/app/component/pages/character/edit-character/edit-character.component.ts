import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/api/character-service.service';
import { StorageKeys } from 'src/app/storage-keys';
import { StatsGenerationComponent } from '../stats-generation/stats-generation.component';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  character: any;
  races = [{}];
  classes = [];
  private sub: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      let id = +params['id'];
      this.character = (await new CharacterService(this.http).get(id)).subscribe(c => this.character = c);
    });
    this.allRacesAndClasses();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onSubmit(character: {
    name: string, ownerId: number, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number
  }) {
    character.ownerId = Number(localStorage.getItem(StorageKeys.userId));
    character.race = character.race.split('|')[1];
    (await new CharacterService(this.http).update(this.character.id, character)).subscribe({
      next: async res => await this.router.navigate(['character']),
      error: async err => {
        let msg: string = "Unknown error occured";
        if (err.status == 404) {
          msg = "This character does not exist.";
          await this.router.navigate(['character']);
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

  private async allRacesAndClasses() {
    (await new CharacterService(this.http).getAllRaces()).subscribe({
      next: r => {
        this.races = r;
        document.getElementById('genBtn')?.removeAttribute('disabled');
      }
    });

    (await new CharacterService(this.http).getAllClasses()).subscribe({
      next: c => { 
        this.classes = c;
      }
    });
  }

  showGenerator() {
    this.dialog.closeAll();
    let selectedRace = (<HTMLSelectElement>document.getElementById('race')).value.split('|')[0];
    let d = this.dialog.open(StatsGenerationComponent, {
      data: { race: selectedRace, http: this.http },
      hasBackdrop: true
    });

    d.afterClosed().subscribe(res => {
      console.log(res);
        if (res.save) {
          this.character.strength = res.stats.strength;
          this.character.dexterity = res.stats.dexterity;
          this.character.constitution = res.stats.constitution;
          this.character.intelligence = res.stats.intelligence;
          this.character.wisdom = res.stats.wisdom;
          this.character.charisma = res.stats.charisma;
        }
    });
  }
}
