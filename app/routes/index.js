import Route from '@ember/routing/route';
import ENV from '../config/environment';
const TMDB_API = 'https://api.themoviedb.org/3';

export default class IndexRoute extends Route {
  async model() {
    let page = 1;
    let response = await fetch(
      `${TMDB_API}/movie/popular?api_key=${ENV.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    let parsed = await response.json();
    return parsed;
  }
}
