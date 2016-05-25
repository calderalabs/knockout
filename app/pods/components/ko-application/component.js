import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  player: inject.service(),
  session: inject.service(),
  tagName: 'section',
  classNames: ['ko-application'],
  isPlaying: computed.readOnly('player.isPlaying'),
  isAuthenticated: computed.readOnly('session.isAuthenticated'),
  currentUserName: computed.readOnly('session.currentUser.name'),

  actions: {
    login() {
      this.get('session').authenticate('simple-auth-authenticator:lock', {
        authParams: { scope: 'openid' }
      });
    }
  }
});
