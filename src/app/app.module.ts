import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PapaParseModule } from 'ngx-papaparse';


import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataDisplayComponent } from './data-display/display.component';
import { Grafico1Component } from './data-display/grafico1/grafico1.component';
import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { Grafico2Component } from './data-display/grafico2/grafico2.component';
import { Grafico3Component } from './data-display/grafico3/grafico3.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    DataDisplayComponent,
    SelectionBarComponent,
    Grafico1Component,
    Grafico2Component,
    Grafico3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PapaParseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
