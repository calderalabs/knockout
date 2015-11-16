import DS from 'ember-data';

const { Model, belongsTo, hasMany, attr } = DS;

export default Model.extend({
  tournament: belongsTo('tournament'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  matches: hasMany('matches'),
  bestOf: attr('number')
});
