import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-plain-list-item'],
  match: null,
  onWatch: null,
  matchGroup: computed.readOnly('match.matchGroup'),
  stage: computed.readOnly('matchGroup.stage'),
  teamOneShortName: computed.readOnly('matchGroup.teamOne.shortName'),
  teamTwoShortName: computed.readOnly('matchGroup.teamTwo.shortName'),
  teamOneFullName: computed.readOnly('matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('matchGroup.teamTwo.fullName')
});
