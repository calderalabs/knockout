import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  tournament: belongsTo(),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  matches: hasMany()
});
