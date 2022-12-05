import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIService {

  public get(id: number) {
    let result = new Subject<any>();
    this.http.get(this.getURL() + "/" + id).subscribe({
    next: res => result.next(res),
    error: err => result.next(err)
  });
    return result.asObservable();
}

  protected getURL(): string {
    return this.root + "user";
  }

}