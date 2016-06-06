import Ember from 'ember';

const { Service, computed } = Ember;

export default Service.extend({
  match: null,
  isPlaying: computed.notEmpty('match'),

  play(match) {
    this.set('match', match);
  }
});
