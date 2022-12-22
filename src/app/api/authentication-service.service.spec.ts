import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication-service.service';
import { HttpStatusCode } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  xit('login correctly', async () => {
    (await service.login({name: "user", password: "password"})).subscribe(
      r => {
        expect(r).toBeTruthy();
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/authentication/login?usernameOrEmail=user&password=password");
    expect(req.request.method).toBe('POST');
    req.flush({success: true, token: "abc"});
  });

  it('login incorrectly', async () => {
    (await service.login({name: "user", password: "password"})).subscribe(
      r => {
        expect(r).toBeFalsy();
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/authentication/login?usernameOrEmail=user&password=password");
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('register valid pass', async () => {
    const register = await service.register({username: "user", email: "email@email.com", password: "Password123"});
    expect(register).toBeTruthy();
    register.subscribe(
      r => {
        expect(r).toBeTruthy();
      }
    );
    const req = httpMock.expectOne("https://localhost:5001/api/authentication/register");
    expect(req.request.method).toBe('POST');
    req.flush(HttpStatusCode.Ok);
  });

  it('register invalid pass', async () => {
    const register = await service.register({username: "user", email: "email@email.com", password: "password"});
    register.subscribe(
      r => { expect(r).toBeFalsy(); }
    )
    const req = httpMock.expectNone("https://localhost:5001/api/authentication/register");
  });
});
