import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character-service.service';
import { HttpStatusCode } from '@angular/common/http';
import { StorageKeys } from '../storage-keys';

const testCharacters = {
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

  it('post data', async () => {
    localStorage.setItem(StorageKeys.token, "abc");
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
    localStorage.setItem(StorageKeys.token, "abc");
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
