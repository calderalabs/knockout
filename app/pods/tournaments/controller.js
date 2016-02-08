import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    show(tournament) {
      this.transitionToRoute('tournament', tournament.get('id'));
    }
  }
});
