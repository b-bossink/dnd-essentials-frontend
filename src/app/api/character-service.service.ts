import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models';
import { APIService } from './api-service';
import { StorageKeys } from '../storage-keys';

@Injectable() 
export class CharacterService extends APIService {

  public async get(id: number) {
    return await this.http.get(this.getURL() + "/" + id, this.reqOptions);
  }

  public async getAllRaces() {
    return await this.http.get<[]>(this.getURL() + "/races", this.reqOptions);
  }

  public async getAllClasses() {
    return await this.http.get<[]>(this.getURL() + "/classes",  this.reqOptions);
  }

  public async getAll() {
    return await this.http.get<[]>(this.getURL(),  this.reqOptions);
  }

  public async post(character: Character) {
      return await this.http.post(this.getURL(), character, this.reqOptions);
  }

  public async update(id: number, character: Character) {
      return await this.http.put(this.getURL() + "/" + id, character, this.reqOptions);
    }

  public async delete(id: number) {
    return await this.http.delete(this.getURL() + "/" + id, this.reqOptions);
  }

  protected getURL(): string {
    return this.root + "character";
  }
}