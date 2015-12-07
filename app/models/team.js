import DS from 'ember-data';

const { Model, belongsTo, hasMany, attr } = DS;

export default Model.extend({
  name: attr('string'),
  reference: belongsTo('team'),
  players: hasMany('player'),
  owner: belongsTo('team-owner', { polymorphic: true })
});
