import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: inject.service(),
  player: inject.service(),

  beforeModel() {
    return this.get('session').fetchCurrentUser();
  },

  activate() {
    return this.get('player').restore();
  },

  sessionAuthenticated() {
    this.refresh();
  }
});
