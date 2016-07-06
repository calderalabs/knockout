import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: {
    gameId: 'game'
  },

  gameId: null,

  actions: {
    show(tournament) {
      this.transitionToRoute('tournament', tournament.get('id'));
    }
  }
});
