import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
}) 

export class CharacterService extends APIService {
  public getAll() {
    return this.http.get(this.getURL());
  }

  public get(id: number) {
    return this.http.get(this.getURL() + "/" + id);
  }

  public post(character: {name: string, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number, id: number}) {
      character.id = 0;
      console.log(character)

      this.http.post(this.getURL(), character).subscribe((response) => {
        console.log(response);
      });
  }

  public update(character: {id: number, name: string, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number}) {
      console.log(character)
    }

  public delete(id: number) {

  }

  private getURL(): string {
    return this.root + "character";
  }
}