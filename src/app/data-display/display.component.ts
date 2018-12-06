import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Zoit } from './zoit.model';

@Component({
  selector: 'app-data-display',
  templateUrl: 'display.component.html'
})

export class DataDisplayComponent implements OnInit, OnChanges {

  @Input() nombre_region: String;
  public zoit: Zoit;
  graph1_render = false;
  graph2_render = false;
  graph3_render = false;


  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.zoit = new Zoit(this.nombre_region, 120);
  }

  onGraphRender = (render_bool) => {
    this.graph1_render = render_bool;
    if (render_bool) {
      this.graph2_render = false;
      this.graph3_render = false;
    }
  }
  onGraphRender2 = (render_bool) => {
    this.graph2_render = render_bool;
    if (render_bool) {
      this.graph1_render = false;
      this.graph3_render = false;
    }
  }
  onGraphRender3 = (render_bool) => {
    this.graph3_render = render_bool;
    if (render_bool) {
      this.graph2_render = false;
      this.graph1_render = false;
    }
  }



}
