import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament-list ko-main-section'],
  gameId: null,
  tournaments: null,

  arrangedTournaments: computed('tournaments.@each.gameId', 'gameId', function() {
    const gameId = this.get('gameId');
    const tournaments = this.get('tournaments');

    if (gameId) {
      return tournaments.filterBy('gameId', this.get('gameId'));
    } else {
      return tournaments;
    }
  })
});
