import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Zoit } from './zoit.model';

@Component({
  selector: 'app-data-display',
  templateUrl: 'display.component.html'
})

export class DataDisplayComponent implements OnInit, OnChanges {

  @Input() nombre_region: String;
  public zoit: Zoit;


  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.zoit = new Zoit(this.nombre_region, 120);
  }



}
