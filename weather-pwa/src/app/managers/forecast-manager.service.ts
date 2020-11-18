import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getForecast(lng: string, lat: string): Promise<object> {
    const apiKey = '<>';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    const url = `${baseUrl}?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
    return this.httpClient.get<object>(url).toPromise();
  }
}
