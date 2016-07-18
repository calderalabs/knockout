import DS from 'ember-data';
import Ember from 'ember';

const { Model, hasMany, attr } = DS;
const { computed, ObjectProxy } = Ember;

const MatchGroup = ObjectProxy.extend({
  matchesArray: computed.readOnly('matches.[]')
});

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

  matches: computed('_matchGroups.@each.matchesArray', function() {
    return this.get('_matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('matches').toArray());
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

  _matchGroups: computed.map('matchGroups', function(matchGroup) {
    return MatchGroup.create({ content: matchGroup });
  })
});
