import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onShow(tournament) {
      this.transitionToRoute('tournament', tournament.get('id'));
    }
  }
});
