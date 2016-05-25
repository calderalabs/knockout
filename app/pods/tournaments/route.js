import Ember from 'ember';
import AuthenticableRouteMixin from 'knockout/mixins/authenticable-route';

const { Route } = Ember;

export default Route.extend(AuthenticableRouteMixin, {
  model() {
    return this.store.findAll('tournament');
  }
});
