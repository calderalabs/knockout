import DS from 'ember-data';
import Ember from 'ember';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  game: attr('string'),
  matchGroups: hasMany('match-group'),

  gameName: computed('game', function() {
    return this.get('game').replace(/-/g, ' ').capitalize();
  }),

  matches: computed('matchGroups.@each.matches.[]', function() {
    return this.get('matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('matches').toArray());
    }, []);
  })
});
