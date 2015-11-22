import DS from 'ember-data';

const { Model, hasMany, attr } = DS;

export default Model.extend({
  name: attr('string'),
  teams: hasMany('team'),
  matchGroups: hasMany('match-group'),
  format: attr('string'),
  game: attr('string')
});
