import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/api/character-service.service';
import { UserService } from 'src/app/api/user-service.service';
import { StorageKeys } from 'src/app/storage-keys';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.css']
})
export class AllCharactersComponent implements OnInit {

  characters: any;
  private http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  async ngOnInit() {
    this.characters = new UserService(this.http).getCharacters(Number(localStorage.getItem(StorageKeys.userId))).subscribe({
      next: c => this.characters = c,
      error: err => alert("Failed to load characters: " + err.message)
    });
  }

}
