import Component from '@glimmer/component';

export default class MovieDetailedComponent extends Component {
  get nothing() {
    console.log(this.args.movie);
    return null;
  }
}
