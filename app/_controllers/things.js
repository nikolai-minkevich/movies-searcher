import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import { action } from '@ember/object';
import Controller, { inject as injectController } from '@ember/controller';
import generateThings from '../utils/generate-things';
import { tracked } from '@glimmer/tracking';

import ENV from '../config/environment';
const TMDB_API = 'https://api.themoviedb.org/3';

export default class ThingsController extends Controller {
  @injectController('application') appController;

  @tracked page = 1;
  @tracked things;
  perPage = 10;

  constructor() {
    super(...arguments);
    // this.things = this._generateThings();
    this.things = [];
    this.initThings();
  }

  async initThings() {
    let res = await this.loadData();
    console.log(res.results);
    this.things = [...this.things, ...res.results];
  }

  @action
  handleLoadMore() {
    return new Promise((resolve) => {
      later(async () => {
        let res = await this.loadData();
        console.log(res.results);
        this.page++;
        this.things = [...this.things, ...res];
        resolve();
      }, this.appController.loadDelay);
    });
  }

  async loadData() {
    let page = 1;
    let response = await fetch(
      `${TMDB_API}/movie/popular?api_key=${ENV.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    let parsed = await response.json();
    console.log(parsed);
    return parsed;
  }

  _generateThings() {
    const start = this.things ? this.things.length + 1 : 0;
    const end = this.page * this.perPage;
    return generateThings(start, end);
  }
}
