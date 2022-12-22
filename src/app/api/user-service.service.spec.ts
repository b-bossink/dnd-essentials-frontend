import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageKeys } from '../storage-keys';

import { UserService } from './user-service.service';

const testData = {
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
};

describe('UserServicee', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('read data', async () => {
    localStorage.setItem(StorageKeys.token, "abc");
    (await service.getCharacters(0)).subscribe(
      r => {
        expect(r).toBeTruthy();
        expect(r).toBe(testData);
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/user/0/character?token=abc");
    expect(req.request.method).toBe('GET');
    req.flush(testData)
  });
});
