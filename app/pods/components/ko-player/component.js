import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';

const { Component, computed, inject } = Ember;

export default Component.extend(VelocityMixin, {
  player: inject.service(),
  tagName: 'section',
  classNames: ['ko-player'],
  teamOneFullName: computed.readOnly('_matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('_matchGroup.teamTwo.fullName'),
  matchNumber: computed.readOnly('_match.number'),
  vodUrl: computed.readOnly('_match.vod.url'),
  _matchGroup: computed.readOnly('_match.matchGroup'),
  _match: computed.readOnly('player.match'),

  title: computed('_matchGroup.stage', '_matchGroup.tournament.name', function() {
    return `${this.get('_matchGroup.stage')}, ${this.get('_matchGroup.tournament.name')}`;
  }).readOnly()
});
