import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  matchGroups: computed.reads('model.matchGroups')
});