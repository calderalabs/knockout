import Ember from 'ember';
import AuthenticatedActionsMixin from 'knockout/mixins/authenticated-actions';

const { Component, computed } = Ember;

export default Component.extend(AuthenticatedActionsMixin, {
  tagName: '',
  title: null,
  tournament: null,
  isFollowed: computed.readOnly('tournament.isFollowed'),

  authenticatedActions: {
    toggleFollow(shouldActivate) {
      const tournament = this.get('tournament');

      if (shouldActivate) {
        return tournament.get('follow').call(tournament);
      }

      return tournament.get('unfollow').call(tournament);
    }
  }
});
