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
  OVERLAY_MULTIPLIER = 10;
  OVERLAY_OFFSET = this.OVERLAY_MULTIPLIER / 2 - 0.5;
  HOVER_COLOR = '#d36f80';

  radius = 5;

  ngAfterContentInit() {

    const points = this.getCentroids();
    console.log(points);
    const center = turf.center(points);

    /*const zoom = d3
    .zoom()
    .scaleExtent(this.ZOOM_THRESHOLD)
    .on('zoom', this.zoomHandler);*/


    const svg = d3.select('div')
      .append('svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .call(d3.zoom().on('zoom', function () {
        svg.attr('transform', d3.event.transform);
        }
      )).append('g');

    /*this.g = svg.call(zoom).append('g');
    this.g.append('rect')
          .attr('width', this.WIDTH * this.OVERLAY_MULTIPLIER)
          .attr('height', this.HEIGHT * this.OVERLAY_MULTIPLIER)
          .attr(
            'transform',
            `translate(-${this.WIDTH * this.OVERLAY_OFFSET},-${this.HEIGHT * this.OVERLAY_OFFSET})`
          )
          .style('fill', 'none')
          .style('pointer-events', 'all');*/


    const projection = d3.geoMercator()
      .center(center.geometry.coordinates)
      .scale(1000)
      .translate([this.WIDTH / 2, this.HEIGHT / 2]);

    const path = d3.geoPath().projection(projection);
    // const color = d3.scaleOrdinal(d3.schemeCategory20c.slice(1, 4));


      svg.append('g')
      .selectAll('path')
      .data(chile.features)
      .enter()
      .append('path')
      .attr('fill', 'green')
      .attr('d', path)
      .attr('stroke', '#222')
      .attr('stroke-width', '0.5')
      .on('mouseover', this.mouseOverHandler)
      .on('mouseout', this.mouseOutHandler)
      .on('click', this.clicked);



  }

  clicked(d, i) {
    d3.select(this).append('circle')
    .attr('cx', d.offsetX)
    .attr('cy', d.offsetY)
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

  mouseOverHandler(d, i) {
    d3.select(this).attr('fill', this.HOVER_COLOR);

  }

  mouseOutHandler(d, i) {
    d3.select(this).attr('fill', 'green');

  }

  /*zoomHandler() {
    this.g.attr('transform', d3.event.transform);
  }
*/


}
