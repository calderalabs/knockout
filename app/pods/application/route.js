import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject, RSVP } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: inject.service(),

  beforeModel() {
    return this.get('session').fetchCurrentUser();
  },

  model() {
    let followings = [];

    if (this.get('session.hasCurrentUser')) {
      followings = this.get('store').findAll('following');
    }

    return RSVP.hash({ followings });
  },

  setupController(controller, model) {
    controller.set('followings', model.followings);
  },

  sessionAuthenticated() {
    this.refresh();
  }
});
