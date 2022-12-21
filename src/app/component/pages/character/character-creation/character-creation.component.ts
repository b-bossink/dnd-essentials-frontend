import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/api/character-service.service';
import { StatsGenerationComponent } from '../stats-generation/stats-generation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent implements OnInit {
  owner = 0;
  races = [{}];
  classes = [];
  str: any;
  dex: any;
  con: any;
  int: any;
  wis: any;
  cha: any;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.allRacesAndClasses();
  }

  async onSubmit(character: {
    name: string, ownerId: number, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number}) {
    character.ownerId = Number(localStorage.getItem("userid"));
    character.race = character.race.split('|')[1];
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
          this.str = res.stats.strength;
          this.dex = res.stats.dexterity;
          this.con = res.stats.constitution;
          this.int = res.stats.intelligence;
          this.wis = res.stats.wisdom;
          this.cha = res.stats.charisma;
        }
    });
  }

}

