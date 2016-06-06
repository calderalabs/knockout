import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  session: inject.service(),
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
  likeCount: computed.readOnly('match.likeCount'),
  matchGroup: computed.readOnly('match.matchGroup'),

  shouldShowToWatchBadge: computed('session.hasCurrentUser', 'match.isWatched', function() {
    return this.get('session.hasCurrentUser') && !this.get('match.isWatched');
  })
});
