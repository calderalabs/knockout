import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Controller.extend({
  tournamentController: inject.controller('tournament'),
  tournament: computed.reads('tournamentController.model'),
  matchGroups: computed.reads('tournamentController.matchGroups'),
  
  actions: {
    close() {
      this.transitionToRoute('tournament', this.get('tournament.id'))
    }
  }
});