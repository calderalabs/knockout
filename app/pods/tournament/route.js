import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  player: inject.service(),

  model(params) {
    return this.get('store').findRecord('tournament', params.id);
  },

  afterModel(model) {
    this.get('player').set('playlist', model.get('matches'));
  }
});
