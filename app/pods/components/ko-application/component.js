import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  player: inject.service(),
  session: inject.service(),
  tagName: 'section',
  classNames: ['ko-application'],
  isLoading: false,
  newMatchesCount: computed.readOnly('_currentUser.newMatchesCount'),
  isPlaying: computed.readOnly('player.isPlaying'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  currentUserName: computed.readOnly('_currentUser.name'),
  hasNewMatches: computed.gt('newMatchesCount', 0),
  _currentUser: computed.readOnly('session.currentUser'),

  actions: {
    login() {
      this.get('session').authenticate('authenticator:application', {
        authParams: { scope: 'openid' }
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
