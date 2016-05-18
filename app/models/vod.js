import MF from 'model-fragments';
import DS from 'ember-data';

const { Fragment } = MF;
const { attr } = DS;

export default Fragment.extend({
  url: attr('string'),
  type: attr('string')
});
