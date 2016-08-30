import Ember from 'ember';
import ENV from 'knockout/config/environment';

const { Component, inject } = Ember;

export default Component.extend({
  session: inject.service(),

  didInsertElement() {
    let userInfo = {};

    if(this.get('session.currentUser')) {
      userInfo = {
        user_id: user.get('id'),
        name: user.get('name'),
        email: user.get('email'),
        created_at: user.get('insertedAt')
      };
    }

    window.Intercom('boot', Object.assign({
      app_id: ENV.intercomAppId
    }, userInfo));
  },

  willDestroyElement() {
    window.Intercom('shutdown');
  }
});
