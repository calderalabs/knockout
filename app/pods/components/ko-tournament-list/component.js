import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament-list'],
  gameId: null,
  tournaments: null,
  shouldShowNav: true,
  shouldShowNewBadge: false,
  title: null,
  arrangedTournaments: computed.sort('_filteredTournaments', '_tournamentsSorting'),
  _tournamentsSorting: ['id:desc'],

  _filteredTournaments: computed('tournaments.@each.gameId', 'gameId', function() {
    const gameId = this.get('gameId');
    const tournaments = this.get('tournaments');

    if (gameId) {
      return tournaments.filterBy('gameId', this.get('gameId'));
    } else {
      return tournaments;
    }
  })
});
