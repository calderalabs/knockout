import DS from 'ember-data';

const { Model, belongsTo } = DS;

export default Model.extend({
  matchGroup: belongsTo('match-group'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  winner: belongsTo('team')
});
