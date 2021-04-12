import Component from '@glimmer/component';
const THEMOVIEDB_IMG = 'https://image.tmdb.org/t/p/w500';

export default class PersonComponent extends Component {
  get photo() {
    if (this.args.person.profile_path) {
      return THEMOVIEDB_IMG + this.args.person.profile_path;
    }
    return false;
  }
  get who() {
    if (this.args.person.character) {
      return this.args.person.character;
    }
    if (this.args.person.job) {
      return this.args.person.job;
    }
    return false;
  }
}
