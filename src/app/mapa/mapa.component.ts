import { Component, AfterContentInit } from '@angular/core';
import * as turf from 'turf';
import * as chile from './chile.json';

import * as d3 from 'd3';




@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.component.html',
  styleUrls: ['mapa.component.css']
})

export class MapaComponent {
  constructor() { }

  ZOOM_THRESHOLD = [0.3, 7];
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  radius = 5;

  ngAfterContentInit() {

    const points = this.getCentroids();
    console.log(points);
    const center = turf.center(points);


    const svg = d3.select('div')
      .append('svg')
      .attr('height', '100%')
      .attr('width', '100%');

    const g = svg.append('g');


    const projection = d3.geoMercator()
      .center(center.geometry.coordinates)
      .scale(1000)
      .translate([this.WIDTH / 2, this.HEIGHT / 2]);

    const path = d3.geoPath().projection(projection);
    // const color = d3.scaleOrdinal(d3.schemeCategory20c.slice(1, 4));


    g.append('g')
      .selectAll('path')
      .data(chile.features)
      .enter()
      .append('path')
      .attr('fill', 'green')
      .attr('d', path)
      .attr('stroke', '#222')
      .attr('stroke-width', '0.5');



  }

  clicked(event: any) {
    d3.select(event.target).append('circle')
    .attr('cx', event.offsetX)
    .attr('cy', event.offsetY)
    .attr('r', () => {
      return this.radius;
    })
    .attr('fill', 'red');
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



}
