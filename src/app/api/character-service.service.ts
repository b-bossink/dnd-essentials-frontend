import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models';
import { APIService } from './api-service';
import { StorageKeys } from '../storage-keys';

@Injectable() 
export class CharacterService extends APIService {
  public async getAll() {
    return await this.http.get(this.getURL());
  }

  public async get(id: number) {
    return await this.http.get(this.getURL() + "/" + id);
  }

  public async post(character: Character) {
      return await this.http.post(this.getURL() + this.tokenParam(), character);
  }

  public async update(id: number, character: Character) {
      return await this.http.put(this.getURL() + "/" + id, character);
    }

  public async delete(id: number) {
    return await this.http.delete(this.getURL() + "/" + id + this.tokenParam());
  }

  protected getURL(): string {
    return this.root + "character";
  }

  private tokenParam() {
    return "?token=" + localStorage.getItem(StorageKeys.token);
  }
}