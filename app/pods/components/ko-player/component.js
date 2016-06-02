import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';
import { task } from 'ember-concurrency';

const { Component, computed, inject } = Ember;

export default Component.extend(VelocityMixin, {
  store: inject.service(),
  player: inject.service(),
  tagName: 'section',
  classNames: ['ko-player'],
  teamOneFullName: computed.readOnly('_matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('_matchGroup.teamTwo.fullName'),
  matchNumber: computed.readOnly('_match.number'),
  vodUrl: computed.readOnly('_match.vod.url'),
  isWatched: computed.readOnly('_match.isWatched'),
  toggleWatchIsRunning: computed.readOnly('toggleWatch.isRunning'),
  _matchGroup: computed.readOnly('_match.matchGroup'),
  _match: computed.readOnly('player.match'),

  title: computed('_matchGroup.stage', '_matchGroup.tournament.name', function() {
    return `${this.get('_matchGroup.stage')}, ${this.get('_matchGroup.tournament.name')}`;
  }).readOnly(),

  toggleWatch: task(function *() {
    if (this.get('isWatched')) {
      yield this._unwatch();
    } else {
      yield this._watch();
    }
  }).drop(),

  _unwatch() {
    return this.get('_match.watchings.firstObject').destroyRecord();
  },

  _watch() {
    return this.get('store').createRecord('watching', {
      match: this.get('_match')
    }).save();
  }
});
