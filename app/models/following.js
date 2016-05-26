import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  createdAt: attr('date', { defaultValue: () => new Date() }),
  tournament: belongsTo('tournament')
});
