import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-match-list-item'],
  match: null,
  onWatch: null,
  number: computed.readOnly('match.number'),
  winnerFullName: computed.readOnly('match.winner.fullName'),
  isWatched: computed.readOnly('match.isWatched'),
  likes: computed.readOnly('match.likes')
});
