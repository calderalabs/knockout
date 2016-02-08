import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament-list'],
  activeGame: null,
  tournaments: null,
  onShow: null,

  arrangedTournaments: computed('tournaments.@each.game', 'activeGame', function() {
    const activeGame = this.get('activeGame');
    const tournaments = this.get('tournaments');

    if (activeGame) {
      return tournaments.filterBy('game', this.get('activeGame'))
    } else {
      return tournaments;
    }
  })
});
