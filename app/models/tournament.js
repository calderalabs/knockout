import DS from 'ember-data';
import Ember from 'ember';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  gameId: attr('string'),
  matchesCount: attr('number'),
  matchGroups: hasMany('match-group'),
  followings: hasMany('following'),
  isFollowed: computed.notEmpty('followings.firstObject'),

  gameName: computed('gameId', function() {
    return this.get('gameId').replace(/-/g, ' ').capitalize();
  }),

  matches: computed('_matches.@each.[]', function() {
    return this.get('_matches').reduce(function(memo, matches) {
      return memo.concat(matches.toArray());
    }, []);
  }),

  follow() {
    if (this.get('isFollowed')) {
      return;
    }

    return this.get('store').createRecord('following', {
      tournament: this
    }).save();
  },

  unfollow() {
    if (!this.get('isFollowed')) {
      return;
    }

    return this.get('followings.firstObject').destroyRecord();
  },

  _matches: computed.mapBy('matchGroups', 'matches')
});
