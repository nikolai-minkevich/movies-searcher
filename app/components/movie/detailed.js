import Component from '@glimmer/component';
const THEMOVIEDB_IMG = 'https://image.tmdb.org/t/p/w500';
export default class MovieDetailedComponent extends Component {
  get year() {
    const { release_date } = this.args.movie;
    return release_date.substr(0, 4);
  }
  get date() {
    const release_date = new Date(this.args.movie.release_date);
    return release_date.toLocaleDateString('en-US');
  }
  get poster() {
    const { poster_path } = this.args.movie;
    return THEMOVIEDB_IMG + poster_path;
  }
  get genres() {
    const { genres } = this.args.movie;
    if (!genres) return null;
    let genres_string = '';
    genres.map((genre, index) => {
      genres_string += genre.name;
      if (index !== genres.length - 1) {
        genres_string += ', ';
      }
    });
    return genres_string;
  }

  get adult() {
    const { adult } = this.args.movie;
    return adult;
  }

  get original_title() {
    const { original_title, title } = this.args.movie;
    if (original_title !== title) {
      return original_title;
    }
    return null;
  }

  get creditsCast() {
    const { cast } = this.args.movie;
    return cast.slice(0, 5);
  }
  get creditsCrew() {
    const { crew } = this.args.movie;
    return crew.slice(0, 5);
  }
}
