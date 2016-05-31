import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-match-group-list-item'],
  matchGroup: null,
  matches: computed.sort('matchGroup.matches', '_matchesSorting'),
  stage: computed.readOnly('matchGroup.stage'),
  teamOneLogoUrl: computed.readOnly('matchGroup.teamOne.logoUrl'),
  teamTwoLogoUrl: computed.readOnly('matchGroup.teamTwo.logoUrl'),
  teamOneScore: computed.readOnly('matchGroup.teamOneScore'),
  teamTwoScore: computed.readOnly('matchGroup.teamTwoScore'),
  teamOneFullName: computed.readOnly('matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('matchGroup.teamTwo.fullName'),
  bestOf: computed.readOnly('matchGroup.bestOf'),
  _matchesSorting: ['number']
});
