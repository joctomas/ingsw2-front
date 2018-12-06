import { Component, AfterContentInit, Output, EventEmitter} from '@angular/core';
import * as turf from 'turf';
import * as chile from './chile.json';

import * as d3 from 'd3';
import { disableDebugTools } from '@angular/platform-browser';




@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.component.html',
  styleUrls: ['mapa.component.css']
})

export class MapaComponent implements AfterContentInit {


  ZOOM_THRESHOLD = [0.3, 7];
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  OVERLAY_MULTIPLIER = 10;
  OVERLAY_OFFSET = this.OVERLAY_MULTIPLIER / 2 - 0.5;
  HOVER_COLOR = '#d36f80';
  @Output() nombre_region = new EventEmitter<string>();

  radius = 5;

  constructor() { }

  ngAfterContentInit() {

    const points = this.getCentroids();
    console.log(points);
    const center = turf.center(points);




    const svg = d3.select('.map__container')
      .append('svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .call(d3.zoom().on('zoom', function () {
        svg.attr('transform', d3.event.transform);
        }
      )).append('g');



    const projection = d3.geoMercator()
      .center([center.geometry.coordinates[0] + 40, center.geometry.coordinates[1] - 5])
      .scale(1000)
      .translate([this.WIDTH / 2, this.HEIGHT / 2]);

    const path = d3.geoPath().projection(projection);


      svg.append('g')
      .selectAll('path')
      .data(chile.features)
      .enter()
      .append('path')
      .attr('fill', 'green')
      .attr('d', path)
      .attr('stroke', '#333')
      .attr('stroke-width', '0.8')
      .on('mouseover', this.mouseOverHandler)
      .on('mouseout', this.mouseOutHandler)
      .on('click', this.clickHandler);



  }

  clickHandler = (d, i) => {
    d3.select('.text__container').text(`Has seleccionado la region de ${d.properties.Region}`);
    this.nombre_region.emit(d.properties.Region);

  }

   getValue(object, path) {
    return path.
        replace(/\[/g, '.').
        replace(/\]/g, '').
        split('.').
        reduce((o, k) => (o || {})[k], object);
}

  getCentroids() {
    const a = [];
    chile.features.forEach(element => {
      let aux = turf.centroid(element);
      a.push(turf.point(aux.geometry.coordinates));
    });

    return turf.featureCollection(a);
  }

  mouseOverHandler(d, i) {
    d3.select(this).attr('fill', this.HOVER_COLOR);

  }

  mouseOutHandler(d, i) {
    d3.select(this).attr('fill', 'green');

  }

}
