import Ember from 'ember';

const { Service, computed, inject } = Ember;

export default Service.extend({
  store: inject.service(),
  session: inject.service(),
  match: null,
  isPlaying: computed.notEmpty('match'),

  play(match) {
    this.set('match', match);

    if (match && !match.get('isWatched')) {
      const following = match.get('matchGroup.tournament.followings.firstObject');
      this.get('store').createRecord('watching', { match }).save();

      if (following) {
        following.decrementProperty('newMatchesCount');
        this.decrementProperty('session.currentUser.newMatchesCount');
      }
    }
  }
});
