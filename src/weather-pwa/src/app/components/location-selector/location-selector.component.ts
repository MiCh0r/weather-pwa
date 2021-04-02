import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISelectableWeatherLocation } from 'src/app/home/home.page';


@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent {

  public selectedValue: ISelectableWeatherLocation;

  constructor(
    public dialogRef: MatDialogRef<LocationSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISelectableWeatherLocation) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
