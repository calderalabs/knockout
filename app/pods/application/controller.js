import Ember from 'ember';

const { Controller, inject, observer, on } = Ember;

export default Controller.extend({
  player: inject.service(),
  store: inject.service(),
  matchId: null,
  match: null,

  queryParams: {
    matchId: 'watch'
  },

  _matchDidChange: observer('player.match', on('init', function() {
    this.set('match', this.get('player.match'));
  })),

  _matchIdDidChange: observer('matchId', function() {
    this.get('player').play(this.get('store').peekRecord('match', this.get('matchId')));
  })
});
