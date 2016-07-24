import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';

const { Component, computed, inject } = Ember;

export default Component.extend(VelocityMixin, {
  player: inject.service(),
  session: inject.service(),
  tagName: 'section',
  classNames: ['ko-player'],
  shouldShowHeader: true,
  teamOneFullName: computed.readOnly('_matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('_matchGroup.teamTwo.fullName'),
  vodUrl: computed.readOnly('_match.vod.url'),
  matchNumber: computed.readOnly('_match.number'),
  matchGroupStage: computed.readOnly('_matchGroup.stage'),
  tournamentName: computed.readOnly('_tournament.name'),
  isLiked: computed.readOnly('_match.isLiked'),
  isWatched: computed.readOnly('_match.isWatched'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  _matchGroup: computed.readOnly('_match.matchGroup'),
  _match: computed.readOnly('player.match'),
  _tournament: computed.readOnly('_matchGroup.tournament'),

  actions: {
    toggleHeader() {
      this.toggleProperty('shouldShowHeader');
    },

    toggleWatch(shouldActivate) {
      const match = this.get('_match');

      if (shouldActivate) {
        return match.get('watch').call(match);
      }

      return match.get('unwatch').call(match);
    },

    toggleLike(shouldActivate) {
      const match = this.get('_match');

      if (shouldActivate) {
        return match.get('like').call(match);
      }

      return match.get('unlike').call(match);
    }
  }
});
