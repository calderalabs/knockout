import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ko-tournament-match-list-item'],
  match: null,
  number: computed.readOnly('match.matchNumber'),
  winnerName: computed.readOnly('match.winner.fullName')
});
