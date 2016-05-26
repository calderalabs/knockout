import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  tagName: 'li',
  classNameBindings: [':ko-tournament-list-item', '_isFollowed:ko-tournament-list-item--followed'],
  tournament: null,
  name: computed.readOnly('tournament.name'),
  stage: computed.readOnly('tournament.stage'),
  gameName: computed.readOnly('tournament.gameName'),
  id: computed.readOnly('tournament.id'),
  unwatchedMatchesCount: computed.readOnly('_unwatchedMatches.length'),
  _following: computed.readOnly('tournament.followings.firstObject'),
  _isFollowed: computed.notEmpty('_following'),
  _unwatchedMatches: computed.filterBy('tournament.matches', 'isWatched', false),

  actions: {
    toggleFollow(event) {
      event.stopPropagation();
      event.preventDefault();

      const following = this.get('_following');

      if (following) {
        following.destroyRecord();
      } else {
        this.get('store').createRecord('following', {
          tournament: this.get('tournament')
        }).save();
      }
    }
  }
});
