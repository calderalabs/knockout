import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'section',
  model: null,
  series: computed.reads('model.series')
});
