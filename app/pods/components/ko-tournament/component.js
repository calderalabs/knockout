import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament'],
  tournament: null,
  isWatch: false,
  isWatchButtonDisabled: computed.empty('matchGroupsToPlay'),
  matchGroups: computed.readOnly('tournament.matchGroups'),
  matchGroupsToPlay: computed.filterBy('matchGroups', 'vods.length'),
  tournamentName: computed.readOnly('tournament.name'),

  actions: {
    watch() {
      this.set('isWatching', true);
    },

    stopWatching() {
      this.set('isWatching', false);
    }
  }
});
