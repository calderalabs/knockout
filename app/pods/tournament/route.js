import Ember from 'ember';
import AuthenticableRouteMixin from 'knockout/mixins/authenticable-route';

const { Route } = Ember;

export default Route.extend(AuthenticableRouteMixin, {
  model(params) {
    return this.store.findRecord('tournament', params.id);
  }
});
