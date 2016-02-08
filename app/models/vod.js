import MF from 'model-fragments';
import DS from 'ember-data';

const { attr } = DS;

export default MF.Fragment.extend({
  url: attr('string'),
  type: attr('string'),
  label: attr('string')
});
