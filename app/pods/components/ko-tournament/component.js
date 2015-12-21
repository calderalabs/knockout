import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'section',
  tournament: null,
  matchGroups: computed.reads('tournament.matchGroups')
});
