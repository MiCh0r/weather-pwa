import { Injectable } from '@angular/core';
import { WeatherForecast } from '../models';
import { HttpService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ForecastManagerService {

  private readonly baseUri = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor(
    private httpService: HttpService
  ) { }

  public getForecast(lng: string, lat: string): Promise<WeatherForecast> {
    const apiKey = '8b76ad5d7d92840d2fba7809bef36755';
    const url = `${this.baseUri}?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
    return this.httpService.get<WeatherForecast>(url);
  }
}
