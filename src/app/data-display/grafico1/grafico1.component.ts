import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Zoit } from '../zoit.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-g1',
  templateUrl: 'grafico1.component.html'
})

export class Grafico1Component implements OnInit, AfterContentInit {
  public width = 1000;
  public height = 600;
  public sizeDivisor = 100;
  public nodePadding = 2.5;
  public simulation;
  public node;
  public svg;
  public nodes;



  @Input() zoit_grafico1: Zoit;
  constructor() { }

  ngOnInit() {  }

  ngAfterContentInit() {
    const color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);
    this.nodes = this.zoit_grafico1.words.map(d => Object.create(d));
    const simulation = this.forceSimulation(this.nodes).on("tick", this.ticked);
    this.simulation = simulation;
    this.svg = d3.select('.svg-unico').attr('height', this.height).attr('width', this.width)
    .attr("viewBox", [-this.width / 2, -this.height / 2, this.width + 250, this.height + 220]);

    this.node = this.svg.selectAll("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
  .data(this.nodes)
  .enter().append("g")
  this.node.append("circle")
    .attr("r", function(d){ return d[1]*10;})
    .attr("fill", color)
    .text(function(d){return 'hola';})
    .attr("cx", function(d){ return d.x*2.5; })
    .attr("cy", function(d){ return d.y*3; });
  this.node.append("text")
      .attr("x",function(d){return d.x*2.5;})
      .attr("y",function(d){return d.y*3;})
      .text(function(d){return d[0];});
/*
    this.node = this.svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(this.nodes)
  .enter().append("circle")
    .attr("r", function(d){ return d[1]*10;})
    .attr("fill", color)
    .text(function(d){return 'hola';})
    .attr("cx", function(d){ return d.x; })
    .attr("cy", function(d){ return d.y; });*/
    //.call(d3.drag(simulation));
    /*.on("start", this.dragstarted)
    .on("drag", this.dragged)
    .on("end", this.dragended));*/

   /* this.node.append('text')
              .attr('x', function(d) {return d.x*2.5+350})
              .attr('y', function(d) {return d.y*2.5+350})
              .attr('fill', 'black')
              .text(function(d){return 'hola';});*/
    /*
  this.node.append('g')
            .selectAll('text')
            .data(this.nodes)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', 8)
            .attr('fill', 'black')
            .attr('cx', (d) =>  d.x)
            .attr('cy', (d) =>  d.y)
            .text(d => (d[0]));
    */



  }

  forceSimulation(nodes){
    return d3.forceSimulation(nodes)
    .force("forceX", d3.forceX().strength(.5).x(this.width * .0000009))
    .force("forceY", d3.forceY().strength(.5).y(this.height * .0000009))
    .force("center", d3.forceCenter().x(this.width * .0000009).y(this.height * .0000009))
    .force("charge", d3.forceManyBody().strength(-100));
  }
   dragstarted = (d) => {
    if (!d3.event.active) {this.simulation.alphaTarget(.03).restart();}
    d.fx = d.x;
    d.fy = d.y;
  }
  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  dragended = (d) => {
    if (!d3.event.active) {this.simulation.alphaTarget(.03); }
    d.fx = null;
    d.fy = null;
  }
  types = (d) => {
    d.gdp = +d.gdp;
    d.size = +d.gdp / this.sizeDivisor;
    d.size < 3 ? d.radius = 3 : d.radius = d.size;
    return d;
  }
  ticked = (d) => {
    this.node
    .attr("cx", function(d) {return d.x; })
    .attr("cy", function(d) {return d.y; });
  }
}
