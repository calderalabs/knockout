import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  routing: inject.service('-routing'),
  tagName: 'li',
  classNameBindings: [':ko-tournament-match-list-item', 'shouldShowGroupInfo:ko-tournament-match-list-item--with-group-info'],
  match: null,
  shouldShowGroupInfo: false,
  stage: computed.readOnly('matchGroup.stage'),
  bestOf: computed.readOnly('matchGroup.bestOf'),
  teamOneLogoUrl: computed.readOnly('matchGroup.teamOne.logoUrl'),
  teamTwoLogoUrl: computed.readOnly('matchGroup.teamTwo.logoUrl'),
  teamOneFullName: computed.readOnly('matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('matchGroup.teamTwo.fullName'),
  number: computed.readOnly('match.number'),
  winnerFullName: computed.readOnly('match.winner.fullName'),
  likesCount: computed.readOnly('match.likesCount'),
  matchGroup: computed.readOnly('match.matchGroup'),
  isNull: computed.readOnly('match.isNull'),

  isNew: computed('match.{isNull,isNew}', 'matchGroup.matches.@each.isNew', function() {
    const match = this.get('match');

    if (match.get('isNull')) {
      return this.get('matchGroup.matches').isAny('isNew');
    }

    return match.get('isNew');
  }),

  actions: {
    transitionToMatch() {
      const matchId = this.get('match.id');

      if (matchId) {
        this.get('routing').transitionTo(null, null, { matchId });
      }
    }
  }
});
