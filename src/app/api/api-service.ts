
import { HttpClient } from '@angular/common/http'
export abstract class APIService {

    protected root: string = "https://localhost:5001/api/";
    protected http: HttpClient;
  constructor(private httpClient:HttpClient) { 
      this.http = httpClient;
  }
}
