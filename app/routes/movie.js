import Route from '@ember/routing/route';
import ENV from '../config/environment';
const TMDB_API = 'https://api.themoviedb.org/3';

export default class MovieRoute extends Route {
  async model() {
    console.log('ROUTE MOVIE', this.params.id);
    let response = await fetch(
      `${TMDB_API}/movie/${this.params.id}?api_key=${ENV.TMDB_API_KEY}&language=en-US`
    );
    let parsed = await response.json();
    return parsed;
  }
}
