import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ko-tournament-match-group'],
  matchGroup: null,
  stage: computed.readOnly('matchGroup.stage'),
  teamOneLogo: computed.readOnly('matchGroup.teamOne.logo.w38xh38'),
  teamTwoLogo: computed.readOnly('matchGroup.teamTwo.logo.w38xh38'),
  teamOneScore: computed.readOnly('matchGroup.teamOneScore'),
  teamTwoScore: computed.readOnly('matchGroup.teamTwoScore'),
  bestOf: computed.readOnly('matchGroup.bestOf')
});
