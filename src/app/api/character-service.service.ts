import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
}) 

export class CharacterService extends APIService {
  public async getAll() {
    return await this.http.get(this.getURL());
  }

  public async get(id: number) {
    return await this.http.get(this.getURL() + "/" + id);
  }

  public async post(character: {name: string, ownerId: number, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number}) {
      return await this.http.post(this.getURL(), character);
  }

  public async update(id: number, character: {name: string, ownerId: number, class: string, race: string, strength: number, dexterity: number,
    constitution: number, intelligence: number, wisdom: number, charisma: number}) {
      return await this.http.put(this.getURL() + "/" + id, character);
    }

  public async delete(id: number) {
    return await this.http.delete(this.getURL() + "/" + id);
  }

  protected getURL(): string {
    return this.root + "character";
  }
}