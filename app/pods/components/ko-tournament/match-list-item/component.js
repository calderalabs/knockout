import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNameBindings: [':ko-tournament-match-list-item', 'shouldShowGroupInfo:ko-tournament-match-list-item--with-group-info'],
  match: null,
  shouldShowGroupInfo: false,
  matchId: computed.readOnly('match.id'),
  stage: computed.readOnly('matchGroup.stage'),
  bestOf: computed.readOnly('matchGroup.bestOf'),
  teamOneLogoUrl: computed.readOnly('matchGroup.teamOne.logoUrl'),
  teamTwoLogoUrl: computed.readOnly('matchGroup.teamTwo.logoUrl'),
  teamOneFullName: computed.readOnly('matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('matchGroup.teamTwo.fullName'),
  number: computed.readOnly('match.number'),
  winnerFullName: computed.readOnly('match.winner.fullName'),
  isWatched: computed.readOnly('match.isWatched'),
  likeCount: computed.readOnly('match.likeCount'),
  matchGroup: computed.readOnly('match.matchGroup')
});
