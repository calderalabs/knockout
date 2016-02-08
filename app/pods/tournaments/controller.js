import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['game'],
  game: null,

  actions: {
    show(tournament) {
      this.transitionToRoute('tournament', tournament.get('id'));
    }
  }
});
