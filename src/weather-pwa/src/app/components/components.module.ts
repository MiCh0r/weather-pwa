import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
    LocationSelectorComponent
} from '.';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


const COMPONENTS = [
    LocationSelectorComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        IonicModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule
    ],
    providers: [
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ComponentsModule { }
