import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  matchGroup: belongsTo('match-group'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  winner: belongsTo('team'),
  matchNumber: attr('number')
});
