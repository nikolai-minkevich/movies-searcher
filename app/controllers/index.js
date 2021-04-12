import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import ENV from '../config/environment';
const TMDB_API = 'https://api.themoviedb.org/3';

export default class DataController extends Controller {
  @tracked page = 1;
  @tracked data;
  @tracked query = '';

  @action
  setQuery({ target: { value } }) {
    this.query = value;
    this.initData();
  }

  constructor() {
    super(...arguments);
    this.data = [];
    this.initData();
  }

  async initData() {
    window.scrollTo(0, 0);
    this.data = [];
    const rawData = await this.loadData();
    this.data = [...this.data, ...rawData.results];
  }

  @action
  handleLoadMore() {
    return new Promise((resolve) => {
      later(async () => {
        this.page++;
        const rawData = await this.loadData();
        this.data = [...this.data, ...rawData.results];
        resolve();
      }, this.query);
    });
  }

  async loadData() {
    let fetchQuery = `${TMDB_API}/movie/popular?api_key=${ENV.TMDB_API_KEY}&language=en-US&page=${this.page}`;
    if (this.query) {
      fetchQuery = `${TMDB_API}/search/movie?api_key=${
        ENV.TMDB_API_KEY
      }&language=en-US&page=${this.page}&query=${encodeURI(this.query)}`;
    }
    let response = await fetch(fetchQuery);
    let parsed = await response.json();
    return parsed;
  }

  document = document;
}
