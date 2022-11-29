import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character-service.service';
import { HttpStatusCode } from '@angular/common/http';

const testCharacters = {
  get: [
    {
      "id": 23,
      "name": "My Awesome Character",
      "class": "Dragonborn",
      "race": "Human",
      "strength": 1,
      "dexterity": 2,
      "constitution": 3,
      "intelligence": 4,
      "wisdom": 5,
      "charisma": 6,
      "ownerID": 1,
      "campaignIDs": []
    }
  ],
  post: {
    name: "My Awesome Character",
    ownerId: 1,
    class: "Dragonborn",
    race: "Human",
    strength: 1,
    dexterity: 2,
    constitution: 3,
    intelligence: 4,
    wisdom: 5,
    charisma: 6,
    }
};

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('read data', async () => {
    (await service.getAll()).subscribe(
      r => {
        expect(r).toBeTruthy();
        expect(r).toBe(testCharacters.get);
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/character");
    expect(req.request.method).toBe('GET');
    req.flush(testCharacters.get)
  });

  it('post data', async () => {
    (await service.post(testCharacters.post)).subscribe(
      r => {
        expect(r).toBeTruthy();
        expect(r).toBe(HttpStatusCode.Ok);
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/character");
    expect(req.request.method).toBe('POST');
    req.flush(HttpStatusCode.Ok);
  });

  it('delete data', async () => {
    (await service.delete(23)).subscribe(
      r => {
        expect(r).toBeTruthy();
        expect(r).toBe(HttpStatusCode.Ok);
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/character/23");
    expect(req.request.method).toBe('DELETE');
    req.flush(HttpStatusCode.Ok);
  });

  it('update data', async () => {
    (await service.update(23, testCharacters.post)).subscribe(
      r => {
        expect(r).toBeTruthy();
        expect(r).toBe(HttpStatusCode.Ok);
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/character/23");
    expect(req.request.method).toBe('PUT');
    req.flush(HttpStatusCode.Ok);
  });


});
