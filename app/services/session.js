import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';

const { inject, on } = Ember;

export default SessionService.extend({
  store: inject.service(),
  currentUser: null,

  fetchCurrentUser() {
    if (this.get('isAuthenticated')) {
      const userId = this.get('data.authenticated.profile.user_id');

      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('currentUser', user);
      });
    }

    return null;
  }
});
