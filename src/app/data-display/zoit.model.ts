
import * as d3 from 'd3';
export class Zoit {
  public nombre: String;
  public n_tweets: Number;
  public words: [String, Number][];
  public fecha: string;
  public n_positivos: number;
  public n_neutrales: number;
  public n_negativos: number;
  public totd: string;
  public full_progress: number;
  public positivo_porc: number;
  public negativo_porc: number;
  public neutral_porc: number;
  public n_min: number;
  public n_max: number;

  constructor(nombre: String, n_tweets: Number) {
    this.nombre = nombre;
    this.n_tweets = n_tweets;
    /*this.n_negativos = null;
    this.n_positivos = null;
    this.n_neutrales = null;
    this.totd = null;
    this.fecha = null;*/
    this.words = [];

    if (nombre === 'Los Lagos') {

      this.pushCSV('futaleufu');
      this.sentimentCSV('futaleufu_sentiment');

    }

    if (nombre === 'Maule') {

      this.words = [['kepaho', 2], ['wena', 3], ['kauros', 4], ['wacan', 1], ['lacheak', 60]];
    }

  }

  pushCSV = (archivo: string) => {
    d3.csv(archivo + '.csv', (datos) => {
      this.words.push([datos.palabra, datos.instancia]);
      });
    }

  sentimentCSV = (archivo: string) => {
    d3.csv(archivo + '.csv', (sentiment_datos) => {
      this.fecha = sentiment_datos.Fecha;
      this.n_positivos = sentiment_datos.Positivos;
      this.n_neutrales = sentiment_datos.Neutrales;
      this.n_negativos = sentiment_datos.Negativos;
      this.totd = sentiment_datos.Twitt_del_dia;

      // Calculos
      this.full_progress = sentiment_datos.Positivos + sentiment_datos.Neutrales + sentiment_datos.Negativos;
      const max = Math.max(sentiment_datos.Positivos, sentiment_datos.Neutrales, sentiment_datos.Negativos);
      const min = Math.min(sentiment_datos.Positivos, sentiment_datos.Neutrales, sentiment_datos.Negativos);
      this.positivo_porc = ((sentiment_datos.Positivos - 0) * 100) / (max - 0);
      this.negativo_porc = ((sentiment_datos.Negativos - 0) * 100) / (max - 0);
      this.neutral_porc = ((sentiment_datos.Neutrales - 0) * 100) / (max - 0);
      this.n_max = max;
      this.n_min = min;

      });
    }

  }



