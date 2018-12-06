
import * as d3 from 'd3';
export class Zoit {
  public nombre: String;
  public n_tweets: Number;
  public words: [String, Number][];

  constructor(nombre: String, n_tweets: Number) {
    this.nombre = nombre;
    this.n_tweets = n_tweets;

    if (nombre === 'Los Lagos') {
      this.words = [];
      this.pushCSV();

    // this.words = [['bueno', 2], ['malo', 3], ['paisaje', 4], ['bacan', 1]];
    }

    if (nombre === 'Maule') {

      this.words = [['kepaho', 2], ['wena', 3], ['kauros', 4], ['wacan', 1], ['lacheak', 60]];
    }

  }

  pushCSV = () => {
    d3.csv('futaleufu.csv', (datos) => {
      this.words.push([datos.palabra, datos.instancia]);
      });
    }
  }



