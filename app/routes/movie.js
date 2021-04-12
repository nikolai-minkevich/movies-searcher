import Route from '@ember/routing/route';
import ENV from '../config/environment';
const TMDB_API = 'https://api.themoviedb.org/3';

export default class MovieRoute extends Route {
  async model(params) {
    let response_movie = await fetch(
      `${TMDB_API}/movie/${params.id}?api_key=${ENV.TMDB_API_KEY}&language=en-US`
    );
    let parsed_movie = await response_movie.json();

    // Add credits
    ///movie/{movie_id}/credits
    let response_credits = await fetch(
      `${TMDB_API}/movie/${params.id}/credits?api_key=${ENV.TMDB_API_KEY}&language=en-US`
    );
    let parsed_credits = await response_credits.json();
    window.scrollTo(0, 0);
    return { ...parsed_credits, ...parsed_movie };
  }
}
