import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-collection-list-item'],
  collection: null,
  onWatch: null,
  matchGroup: computed.readOnly('collection.matchGroup'),
  matches: computed.readOnly('collection.matches'),
  stage: computed.readOnly('matchGroup.stage'),
  teamOneLogo: computed.readOnly('matchGroup.teamOne.logo'),
  teamTwoLogo: computed.readOnly('matchGroup.teamTwo.logo'),
  teamOneScore: computed.readOnly('matchGroup.teamOneScore'),
  teamTwoScore: computed.readOnly('matchGroup.teamTwoScore'),
  teamOneFullName: computed.readOnly('matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('matchGroup.teamTwo.fullName'),
  bestOf: computed.readOnly('matchGroup.bestOf')
});
