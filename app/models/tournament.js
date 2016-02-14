import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash/lodash';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  matchGroups: hasMany('match-group'),

  game: attr('string', { defaultValue: function() {
    return _.sample(['dota2', 'lol', 'hearthstone', 'csgo', 'sc2']);
  } }),

  stage: attr('string', { defaultValue: function() {
    return _.sample(['Group Stages', 'Qualifiers', 'Main Event', 'Finals']);
  } }),

  gameName: computed('game', function() {
    return this.get('game').replace(/-/g, ' ').capitalize();
  })
});
