import DS from 'ember-data';

const { Model, belongsTo } = DS;

export default Model.extend({
  series: belongsTo('series'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  winner: belongsTo('team')
});
