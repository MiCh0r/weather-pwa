import { Injectable } from '@angular/core';
import { ILatLng } from '../home/home.page';
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

  public async getForecast(position: ILatLng): Promise<WeatherForecast> {
    let storageItem: string;
    if (!navigator.onLine) {
      storageItem = localStorage.getItem(`lat=${position.lat}&lon=${position.lng}`);
    }

    if (!storageItem && navigator.onLine) {
      const apiKey = '8b76ad5d7d92840d2fba7809bef36755';
      const url = `${this.baseUri}?lat=${position.lat}&lon=${position.lng}&appid=${apiKey}&units=metric`;
      const weatherForecast = await this.httpService.get<WeatherForecast>(url);
      localStorage.setItem(`lat=${position.lat}&lon=${position.lng}`, JSON.stringify(weatherForecast));
      return weatherForecast;
    } else if (!storageItem && !navigator.onLine) {
      console.log("ERROR you are offline");
    } else {
      return JSON.parse(storageItem);
    }
  }
}
