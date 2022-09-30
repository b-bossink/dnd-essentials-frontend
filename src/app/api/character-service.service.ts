import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
}) 

export class CharacterService extends APIService {
  public getAll() {
    return this.http.get(this.root).subscribe(json => console.log(json));
  }
}