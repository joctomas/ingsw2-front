import * as data from './futaleufu.json';
export class Zoit {
  public nombre: String;
  public n_tweets: Number;
  public words: [String, Number][];

  constructor(nombre: String, n_tweets: Number) {
    this.nombre = nombre;
    this.n_tweets = n_tweets;

    if (nombre === 'Los Lagos') {
      this.words = [];
      this.pushData();

    // this.words = [['bueno', 2], ['malo', 3], ['paisaje', 4], ['bacan', 1]];
    }

    if (nombre === 'Maule') {

      this.words = [['kepaho', 2], ['zorra', 3], ['pico', 4], ['wacan', 1]];
    }

  }

  pushData = () => {
    data.forEach( (element) => {
      this.words.push([element.palabra, element.instancia]);
    });
  }

  }
