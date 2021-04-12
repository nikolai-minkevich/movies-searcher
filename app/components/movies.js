import Component from '@glimmer/component';

export default class MoviesComponent extends Component {
  get data() {
    return this.args.moviesPage.results;
  }
  get page() {
    return this.args.moviesPage.page;
  }
  get totalPages() {
    return this.args.moviesPage.total_pages;
  }
  get totalResults() {
    return this.args.moviesPage.total_results;
  }
}
