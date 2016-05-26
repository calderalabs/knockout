import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  createdAt: attr('date'),
  tournament: belongsTo('tournament')
});
