import DS from 'ember-data';

const { Model, hasMany, attr } = DS;

export default Model.extend({
  name: attr('string'),
  teams: hasMany('team'),
  series: hasMany('series'),
  format: attr('string')
});
