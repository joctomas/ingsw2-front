import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataDisplayComponent } from './data-display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent, MapaComponent, DataDisplayComponent]
})
export class AppModule { }
