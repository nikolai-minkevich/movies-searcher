import Route from '@ember/routing/route';
import ENV from '../config/environment';
const TMDB_API = 'https://api.themoviedb.org/3';

export default class MovieRoute extends Route {
  async model(params) {
    console.log('ROUTE MOVUE???', params);
    let response_movie = await fetch(
      `${TMDB_API}/movie/${params.id}?api_key=${ENV.TMDB_API_KEY}&language=en-US`
    );
    let parsed_movie = await response_movie.json();
    console.log(parsed_movie);
    return parsed_movie;
  }
}
