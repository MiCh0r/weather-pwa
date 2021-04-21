import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { ForecastManagerService } from '../managers';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material/dialog';
import { LocationSelectorComponent } from '../components/location-selector/location-selector.component';

export interface ICurrentWeatherData {
  temperature: number;
  humidity: number;
  windDirection: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
}

export interface IDailyWeatherData {
  date: string;
  dailyIcon: string;
  tempHigh: number;
  tempLow: number;
}

export interface IWeatherLocation {
  location: string;
  locationTime: string | Date;
  description: string;
  dailyIcon: string;
  currentData: ICurrentWeatherData;
  dailyData: IDailyWeatherData[];
}

export interface ILatLng { lat: number, lng: number };


export interface ISelectableWeatherLocation {
  value: ILatLng;
  viewValue: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public weatherData: IWeatherLocation[] = [];
  private selectableLocations: ISelectableWeatherLocation[] = [
    { value: { lat: 48.16542, lng: 14.03664 }, viewValue: 'Wels, Austria' },
    { value: { lat: 40.7720232, lng: -73.9732319 }, viewValue: 'New York, USA' }
  ];

  constructor(
    private dialog: MatDialog,
    private forecastManager: ForecastManagerService) { }

  ngOnInit(): void {
  }

  public async addWeatherCard(addableLocation: ISelectableWeatherLocation): Promise<void> {
    const weatherForecast = await this.forecastManager.getForecast(addableLocation.value);

    const forecastFrom = DateTime
      .fromSeconds(weatherForecast.current.dt)
      .setZone(weatherForecast.timezone).toFormat('DDDD t');

    const dailyForecast: IDailyWeatherData[] = [];
    weatherForecast.daily.forEach(element => {
      dailyForecast.push({
        date: DateTime
          .fromSeconds(element.dt)
          .setZone(weatherForecast.timezone)
          .toFormat('ccc'),
        dailyIcon: this.getIcon(element.weather[0].icon),
        tempHigh: this.round(element.temp.max),
        tempLow: this.round(element.temp.min)
      })
    });
    dailyForecast.shift();

    this.weatherData.push({
      location: addableLocation.viewValue,
      locationTime: forecastFrom,
      description: weatherForecast.current.weather[0].description,
      dailyIcon: this.getIcon(weatherForecast.current.weather[0].icon),
      currentData: {
        humidity: this.round(weatherForecast.current.humidity),
        sunrise: DateTime.fromSeconds(weatherForecast.current.sunrise)
          .setZone(weatherForecast.timezone)
          .toFormat('t'),
        sunset: DateTime.fromSeconds(weatherForecast.current.sunset)
          .setZone(weatherForecast.timezone)
          .toFormat('t'),
        temperature: this.round(weatherForecast.current.temp),
        windDirection: this.round(weatherForecast.current.wind_deg),
        windSpeed: this.round(weatherForecast.current.wind_speed)
      },
      dailyData: dailyForecast
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(LocationSelectorComponent, {
      width: '250px',
      data: this.selectableLocations
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const location: ISelectableWeatherLocation = result;
        await this.addWeatherCard(location);
      }
    });
  }

  private round(value: number): number {
    return Math.round(value);
  }

  private getIcon(name: string) {
    return `assets/icon/${name}@2x.png`;
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

  public removeWeatherItem(weatherItem) {

    for (let i = 0; i < this.weatherData.length; i++) {

      if (this.weatherData[i] == weatherItem) {
        this.weatherData.splice(i, 1);
      }
    }
  }
}
