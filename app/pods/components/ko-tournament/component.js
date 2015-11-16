import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'section',
  model: null,
  matchGroups: computed.reads('model.matchGroups')
});
