import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';

const { inject } = Ember;

export default SessionService.extend({
  store: inject.service(),
  currentUser: null,

  fetchCurrentUser() {
    if (this.get('isAuthenticated')) {
      debugger;
      return this.get('store').findRecord('user', this.get('data.user_id')).then((user) => {
        this.set('currentUser', user);
      });
    }

    return null;
  }
});
