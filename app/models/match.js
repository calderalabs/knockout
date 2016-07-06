import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from 'ember';
import SpoilerableMixin from 'knockout/mixins/spoilerable';

const { computed, inject } = Ember;
const { Model, belongsTo, hasMany, attr } = DS;
const { fragment } = MF;

export default Model.extend(SpoilerableMixin, {
  session: inject.service(),
  number: attr('number'),
  likesCount: attr('number'),
  vod: fragment('vod'),
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team'),
  watchings: hasMany('watching'),
  likes: hasMany('like'),
  isWatched: computed.notEmpty('watchings.firstObject'),
  isLiked: computed.notEmpty('likes.firstObject'),
  tournamentFollowing: computed.readOnly('matchGroup.tournament.followings.firstObject'),

  isNew: computed(
    'tournamentFollowing.seenAt',
    'matchGroup.startedAt',
    'watchings.firstObject', function() {
    const tournamentFollowingSeenAt = this.get('tournamentFollowing.seenAt');

    if (tournamentFollowingSeenAt) {
      return tournamentFollowingSeenAt < this.get('matchGroup.startedAt') &&
             !this.get('watchings.firstObject');
    }

    return false;
  }),

  watch() {
    if (this.get('isWatched')) {
      return;
    }

    const tournamentFollowing = this.get('tournamentFollowing');

    if (tournamentFollowing) {
      tournamentFollowing.decrementProperty('newMatchesCount');
      this.decrementProperty('session.currentUser.newMatchesCount');
    }

    return this.get('store').createRecord('watching', { match: this }).save();
  },

  unwatch() {
    if (!this.get('isWatched')) {
      return;
    }

    const tournamentFollowing = this.get('tournamentFollowing');

    if (tournamentFollowing) {
      tournamentFollowing.incrementProperty('newMatchesCount');
      this.incrementProperty('session.currentUser.newMatchesCount');
    }

    return this.get('watchings.firstObject').destroyRecord();
  },

  like() {
    if (this.get('isLiked')) {
      return;
    }

    this.incrementProperty('likesCount');
    return this.get('store').createRecord('like', { match: this }).save();
  },

  unlike() {
    if (!this.get('isLiked')) {
      return;
    }

    this.decrementProperty('likesCount');
    return this.get('likes.firstObject').destroyRecord();
  }
});
