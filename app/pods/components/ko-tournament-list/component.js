import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament-list'],
  game: null,
  tournaments: null,
  showNav: true,
  title: null,
  arrangedTournaments: computed.sort('_filteredTournaments', '_tournamentsSorting'),
  _tournamentsSorting: ['id:desc'],

  _filteredTournaments: computed('tournaments.@each.game', 'game', function() {
    const game = this.get('game');
    const tournaments = this.get('tournaments');

    if (game) {
      return tournaments.filterBy('game', this.get('game'));
    } else {
      return tournaments;
    }
  })
});
