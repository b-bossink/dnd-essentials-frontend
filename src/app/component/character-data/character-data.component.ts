import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/app/api/character-service.service';

@Component({
  selector: 'app-character-data',
  templateUrl: './character-data.component.html',
  styleUrls: ['./character-data.component.css']
})
export class CharacterDataComponent implements OnInit {

  characters: any;
  private http: HttpClient;
  idOnSubmit = 0;
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
    this.characters = new CharacterService(this.http).getAll().subscribe(c => this.characters = c);
  }

  onSubmit(character: {name: string, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number, id: number}) {
      new CharacterService(this.http).post(character);
  }

  ngOnInit(): void {}

}
