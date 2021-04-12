import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import { action } from '@ember/object';
import Controller, { inject as injectController } from '@ember/controller';
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
    this.things = [];
    this.initThings();
  }

  async initThings() {
    let data = await this.loadData();
    this.things = [...this.things, ...data.results];
  }

  @action
  handleLoadMore() {
    return new Promise((resolve) => {
      later(async () => {
        this.page++;
        const data = await this.loadData();
        this.things = [...this.things, ...data.results];
        resolve();
      }, this.appController.loadDelay);
    });
  }

  async loadData() {
    let response = await fetch(
      `${TMDB_API}/movie/popular?api_key=${ENV.TMDB_API_KEY}&language=en-US&page=${this.page}`
    );
    let parsed = await response.json();
    return parsed;
  }

  document = document;
}
