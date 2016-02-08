import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ko-timeline'],
  tournament: null,
  matchGroups: computed.readOnly('tournament.matchGroups')
});
