import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';

const { inject, computed } = Ember;

export default SessionService.extend({
  store: inject.service(),
  intercom: inject.service(),
  currentUser: null,
  hasCurrentUser: computed.notEmpty('currentUser'),

  fetchCurrentUser() {
    if (this.get('isAuthenticated')) {
      const userId = this.get('data.authenticated.profile.user_id');

      return this.get('store').findRecord('user', userId).then((user) => {
        this.get('intercom').set('user.name', user.get('name'));
        this.get('intercom').set('user.email', user.get('email'));
        this.get('intercom').set('user.createdAt', user.get('insertedAt'));
        this.set('currentUser', user);
      });
    }

    return null;
  }
});
