import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNameBindings: [':ko-tournament-match-list-item', 'showGroupInfo:ko-tournament-match-list-item--with-group-info'],
  match: null,
  onWatch: null,
  showGroupInfo: false,
  stage: computed.readOnly('_matchGroup.stage'),
  bestOf: computed.readOnly('_matchGroup.bestOf'),
  teamOneLogoUrl: computed.readOnly('_matchGroup.teamOne.logoUrl'),
  teamTwoLogoUrl: computed.readOnly('_matchGroup.teamTwo.logoUrl'),
  teamOneFullName: computed.readOnly('_matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('_matchGroup.teamTwo.fullName'),
  number: computed.readOnly('match.number'),
  winnerFullName: computed.readOnly('match.winner.fullName'),
  isWatched: computed.readOnly('match.isWatched'),
  likeCount: computed.readOnly('match.likeCount'),
  _matchGroup: computed.readOnly('match.matchGroup')
});
