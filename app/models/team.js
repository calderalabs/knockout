import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;

export default Model.extend({
  shortName: attr('string'),
  fullName: attr('string'),

  name: Ember.computed.readOnly('fullName')
});
