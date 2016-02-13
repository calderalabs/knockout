import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash/lodash';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  game: attr('string', { defaultValue: 'dota-2' }),
  matchGroups: hasMany('match-group'),

  stage: computed(function() {
    return _.sample(['Group Stages', 'Qualifiers', 'Main Event', 'Finals']);
  }),

  gameName: computed('game', function() {
    return this.get('game').replace(/-/g, ' ').capitalize();
  })
});
