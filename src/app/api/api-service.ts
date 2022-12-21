
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { StorageKeys } from '../storage-keys';
@Injectable()
export abstract class APIService {

    protected root: string = "https://localhost:5001/api/";
    protected http: HttpClient;
  constructor(private httpClient:HttpClient) { 
      this.http = httpClient;
  }

  protected tokenParam() {
    return "?token=" + localStorage.getItem(StorageKeys.token);
  }

  protected abstract getURL() : string;
}
