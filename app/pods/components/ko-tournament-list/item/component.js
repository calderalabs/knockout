import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-list-item'],
  tournament: null,
  name: computed.readOnly('tournament.name'),
  stage: computed.readOnly('tournament.stage'),
  gameName: computed.readOnly('tournament.gameName'),
  id: computed.readOnly('tournament.id'),
  unwatchedMatchesCount: computed.readOnly('_unwatchedMatches.length'),
  _unwatchedMatches: computed.filterBy('tournament.matches', 'isWatched', false)
});
