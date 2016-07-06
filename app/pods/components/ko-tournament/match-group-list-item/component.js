import Ember from 'ember';
import _ from 'npm:lodash';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-match-group-list-item'],
  matchGroup: null,
  stage: computed.readOnly('matchGroup.stage'),
  teamOneLogoUrl: computed.readOnly('matchGroup.teamOne.logoUrl'),
  teamTwoLogoUrl: computed.readOnly('matchGroup.teamTwo.logoUrl'),
  teamOneScore: computed.readOnly('matchGroup.teamOneScore'),
  teamTwoScore: computed.readOnly('matchGroup.teamTwoScore'),
  teamOneFullName: computed.readOnly('matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('matchGroup.teamTwo.fullName'),
  bestOf: computed.readOnly('matchGroup.bestOf'),

  matches: computed('_sortedMatches.[]', 'bestOf', function() {
    const sortedMatches = this.get('_sortedMatches');

    return _.range(this.get('bestOf')).map((i) => {
      if (sortedMatches[i]) {
        return sortedMatches[i];
      }

      return Ember.Object.create({
        isNull: true,
        number: i,
        matchGroup: this.get('matchGroup'),
        likeCount: 0
      });
    });
  }),

  _matchesSorting: ['number'],
  _sortedMatches: computed.sort('matchGroup.matches', '_matchesSorting')
});
