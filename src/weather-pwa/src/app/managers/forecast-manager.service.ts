import { Injectable } from '@angular/core';
import { HttpService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ForecastManagerService {

  private readonly baseUri = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor(
    private httpService: HttpService
  ) { }

  public getForecast(lng: string, lat: string): Promise<object> {
    const apiKey = '';
    const url = `${this.baseUri}?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
    return this.httpService.get<object>(url);
  }
}
