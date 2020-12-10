import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { ForecastManagerService } from '../managers/forecast-manager.service';

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

  constructor(private forecastManager: ForecastManagerService) { }

  ngOnInit(): void {
    this.weatherData.push({
      location: 'Wels, Austria',
      locationTime: new Date().toLocaleString()
    });
  }

  public async addWeatherCard(): Promise<void> {
    const weatherForecast = await this.forecastManager.getForecast('-73.9732319', '40.7720232') as any;

    this.weatherData.push({
      location: 'Los Angeles, California',
      locationTime: 'Mittwoch, 4. November 2020 20:09'
    });
  }

  public removeWeatherCard(): void {
    this.weatherData.pop();
  }

  public doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.weatherData);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.weatherData = ev.detail.complete(this.weatherData);

    // After complete is called the items will be in the new order
    console.log('After complete', this.weatherData);
  }
}
