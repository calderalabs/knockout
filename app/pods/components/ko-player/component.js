import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';

const { Component, on, computed } = Ember;
const TRANSITION_DURATION = 200;

export default Component.extend(VelocityMixin, {
  tagName: 'section',
  classNames: ['ko-player'],
  player: null,
  teamOneFullName: computed.readOnly('_matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('_matchGroup.teamTwo.fullName'),
  stage: computed.readOnly('_matchGroup.stage'),
  tournamentName: computed.readOnly('_matchGroup.tournament.name'),
  matchNumber: computed.readOnly('player.match.matchNumber'),
  _matchGroup: computed.readOnly('player.match.matchGroup'),

  animateOpacity: on('didInsertElement', function() {
    this.animate({ opacity: 1 }, TRANSITION_DURATION);
  }),

  actions: {
    close() {
      this.animate({ opacity: 0 }, TRANSITION_DURATION).then(() => {
        this.get('player').stopPlaying();
      });
    }
  }
});
