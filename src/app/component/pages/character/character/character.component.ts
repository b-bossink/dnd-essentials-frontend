import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/app/api/character-service.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: any;
  private sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private loc: Location) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      let id = +params['id'];
      this.character = (await new CharacterService(this.http).get(id)).subscribe(c => { 
        if (c != null) {
          this.character = c 
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async delete() {
    const c = confirm("Are you sure you want to delete your character '" + this.character.name + "'?");
    if (c) {
      (await new CharacterService(this.http).delete(this.character.id)).subscribe(
        async res => {
        this.loc.back();
      });
    }
  }

}
