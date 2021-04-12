import Component from '@glimmer/component';
const THEMOVIEDB_IMG = 'https://image.tmdb.org/t/p/w500';

export default class MovieComponent extends Component {
  get year() {
    const { release_date } = this.args.movie;
    if (!release_date) {
      return '';
    }
    return release_date.substr(0, 4);
  }
  get poster() {
    const { poster_path } = this.args.movie;
    if (poster_path) {
      return THEMOVIEDB_IMG + poster_path;
    }
    return null;
  }
}
