import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  player: inject.service(),
  session: inject.service(),
  tagName: 'section',
  classNames: ['ko-application'],
  isLoading: false,
  isPlaying: computed.readOnly('player.isPlaying'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  currentUserName: computed.readOnly('session.currentUser.name'),

  actions: {
    login() {
      this.get('session').authenticate('simple-auth-authenticator:lock', {
        authParams: { scope: 'openid' }
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
