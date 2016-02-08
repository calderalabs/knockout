import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-filter-list'],
  tournament: null,
  teams: computed.readOnly('tournament.teams')
});
