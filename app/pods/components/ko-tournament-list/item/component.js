import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Component, computed, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  session: inject.service(),
  tagName: 'li',
  classNameBindings: [':ko-tournament-list-item', '_isFollowed:ko-tournament-list-item--followed'],
  tournament: null,
  name: computed.readOnly('tournament.name'),
  stage: computed.readOnly('tournament.stage'),
  gameName: computed.readOnly('tournament.gameName'),
  id: computed.readOnly('tournament.id'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  unwatchedMatchesCount: computed.readOnly('_unwatchedMatches.length'),
  toggleFollowIsRunning: computed.readOnly('_toggleFollow.isRunning'),
  _unwatchedMatches: computed.filterBy('tournament.matches', 'isWatched', false),
  _isFollowed: computed.readOnly('tournament.isFollowed'),

  _toggleFollow: task(function *() {
    if (this.get('_isFollowed')) {
      yield this._unfollow();
    } else {
      yield this._follow();
    }
  }).drop(),

  _unfollow() {
    return this.get('tournament.followings.firstObject').destroyRecord();
  },

  _follow() {
    return this.get('store').createRecord('following', {
      tournament: this.get('tournament')
    }).save();
  },

  actions: {
    toggleFollow(event) {
      event.stopPropagation();
      event.preventDefault();
      this.get('_toggleFollow').perform();
    }
  }
});
