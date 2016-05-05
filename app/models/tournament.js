import DS from 'ember-data';
import Ember from 'ember';
import _ from 'npm:lodash';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  matchGroups: hasMany('match-group'),

  game: attr('string', { defaultValue() {
    return _.sample(['dota2', 'lol', 'hearthstone', 'csgo', 'sc2']);
  } }),

  stage: attr('string', { defaultValue() {
    return _.sample(['Group Stages', 'Qualifiers', 'Main Event', 'Finals']);
  } }),

  gameName: computed('game', function() {
    return this.get('game').replace(/-/g, ' ').capitalize();
  }),

  matches: computed('matchGroups.@each.matches.[]', function() {
    return this.get('matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('matches').toArray());
    }, []);
  })
});
