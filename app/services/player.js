import Ember from 'ember';

const { Service, computed, inject } = Ember;

export default Service.extend({
  store: inject.service(),
  match: null,
  isPlaying: computed.notEmpty('match'),

  play(match) {
    this.get('store').createRecord('watching', { match }).save();
    this.set('match', match);
  }
});
