import Ember from 'ember';

const { Service, computed, inject } = Ember;

export default Service.extend({
  session: inject.service(),
  match: null,
  isPlaying: computed.notEmpty('match'),

  play(match) {
    this.set('match', match);

    if (match && this.get('session.hasCurrentUser')) {
      match.get('watch').call(match);
    }
  }
});
