import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  match: belongsTo('match'),
  url: attr('string'),
  type: attr('string')
});
