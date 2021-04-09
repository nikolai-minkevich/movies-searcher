import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    // return {
    //   id: '76341',
    //   original_title: 'Mad Max: Fury Road',
    //   poster_path: '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
    //   release_date: '2015-05-13',
    // };
    let response = await fetch('/movie/76341.json');
    let parsed = await response.json();
    return parsed;
  }
}
