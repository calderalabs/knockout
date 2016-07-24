import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ko-tournament-list'],
  tournaments: null,
  arrangedTournaments: computed.sort('tournaments', '_tournamentsSorting'),
  _tournamentsSorting: ['startedAt:desc']
});
