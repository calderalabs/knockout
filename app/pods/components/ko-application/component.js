import Ember from 'ember';
import _ from 'npm:lodash';

const { Component, inject, computed } = Ember;

export default Component.extend({
  player: inject.service(),
  session: inject.service(),
  tagName: 'section',
  classNames: ['ko-application'],
  followings: null,
  isLoading: false,
  isPlaying: computed.readOnly('player.isPlaying'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  currentUserName: computed.readOnly('_currentUser.name'),
  hasNewMatches: computed.gt('newMatchesCount', 0),
  _currentUser: computed.readOnly('session.currentUser'),

  newMatchesCount: computed('followings.@each.newMatchesCount', function() {
    return _.sum(this.get('followings').mapBy('newMatchesCount'));
  }),

  actions: {
    login() {
      this.get('session').authenticate('authenticator:application');
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
