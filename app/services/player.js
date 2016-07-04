import Ember from 'ember';

const { Service, computed, inject } = Ember;

export default Service.extend({
  store: inject.service(),
  session: inject.service(),
  match: null,
  isPlaying: computed.notEmpty('match'),

  play(match) {
    if (match) {
      const following = match.get('matchGroup.tournament.followings.firstObject');

      if (following) {
        this.get('store').createRecord('watching', { match }).save();
        following.decrementProperty('newMatchesCount');
        this.get('session.currentUser').decrementProperty('newMatchesCount');
      }
    }

    this.set('match', match);
  }
});
