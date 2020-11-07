import { Component, OnInit } from '@angular/core';

export interface IWeatherLocation {
  location: string;
  locationTime: string | Date;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public weatherData: IWeatherLocation[] = [];

  constructor() { }

  ngOnInit(): void {
    this.weatherData.push({
      location: 'Wels, Austria',
      locationTime: new Date().toISOString()
    });
  }

  public addWeatherCard(): void {
    this.weatherData.push({
      location: 'Los Angeles, California',
      locationTime: 'Mittwoch, 4. November 2020 20:09'
    });

  }

  public removeWeatherCard(): void {
    this.weatherData.pop();
  }
}
