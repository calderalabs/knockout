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
  isFollowed: computed.readOnly('tournament.isFollowed'),
  _unwatchedMatches: computed.filterBy('tournament.matches', 'isWatched', false),

  actions: {
    toggleFollow(shouldActivate, event) {
      event.stopPropagation();
      event.preventDefault();

      if (shouldActivate) {
        return this.get('store').createRecord('following', {
          tournament: this.get('tournament')
        }).save();
      }

      return this.get('tournament.followings.firstObject').destroyRecord();
    }
  }
});
