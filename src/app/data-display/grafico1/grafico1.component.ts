import { Component, OnInit, Input } from '@angular/core';
import { Zoit } from '../zoit.model';

@Component({
  selector: 'app-g1',
  templateUrl: 'grafico1.component.html'
})

export class Grafico1Component implements OnInit {

  @Input() zoit_grafico1: Zoit;
  constructor() { }

  ngOnInit() {  }
}
