import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  session: inject.service(),
  tagName: '',
  title: null,
  tournament: null,
  isFollowed: computed.readOnly('tournament.isFollowed'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),

  actions: {
    toggleFollow(shouldActivate) {
      const tournament = this.get('tournament');

      if (shouldActivate) {
        return tournament.follow();
      }

      return tournament.unfollow();
    }
  }
});
