import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsGenerationService extends APIService {

  public async generate(race: string, dice: string[]) : Promise<Observable<any>> {
    return await this.http.post(this.getURL(), {raceIndex: race, diceNames: dice});
  }

  protected getURL(): string {
    return this.root + "generate";
  }
}
