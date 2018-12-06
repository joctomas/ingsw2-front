import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selection-bar',
  templateUrl: 'selection-bar.component.html',
  styleUrls: ['selection-bar.component.css']
})

export class SelectionBarComponent implements OnInit {
  constructor() { }
  @Output() render_graph1 = new EventEmitter<boolean>();
  @Output() render_graph2 = new EventEmitter<boolean>();
  @Output() render_graph3 = new EventEmitter<boolean>();

  graph1_flag = false;
  graph2_flag = false;
  graph3_flag = false;

  ngOnInit() { }

  onGrafico1() {

    if (this.graph1_flag) {
      this.render_graph1.emit(false);
      this.graph1_flag = false;
    } else {
      this.render_graph1.emit(true);
      this.graph1_flag = true;
      this.graph2_flag = false;
      this.graph3_flag = false;
    }
  }
  onGrafico2() {

    if (this.graph2_flag) {
      this.render_graph2.emit(false);
      this.graph2_flag = false;
    } else {
      this.render_graph2.emit(true);
      this.graph2_flag = true;
      this.graph1_flag = false;
      this.graph3_flag = false;
    }
  }
  onGrafico3() {

    if (this.graph3_flag) {
      this.render_graph3.emit(false);
      this.graph3_flag = false;
    } else {
      this.render_graph3.emit(true);
      this.graph3_flag = true;
      this.graph1_flag = false;
      this.graph2_flag = false;
    }
  }
}

