import Component from '@glimmer/component';
const STAR_FILLED = '★';
const STAR_EMPTY = '☆';

export default class RatingComponent extends Component {
  get rating() {
    let rating_string = '';
    for (let i = 0; i < parseInt(this.args.rating); i++) {
      rating_string += STAR_FILLED;
    }
    for (let i = 0; i < 10 - parseInt(this.args.rating); i++) {
      rating_string += STAR_EMPTY;
    }

    parseInt(this.args.rating);
    return rating_string;
  }
}
