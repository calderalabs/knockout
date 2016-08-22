import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';
import AuthenticatedActionsMixin from 'knockout/mixins/authenticated-actions';

const { Component, computed, inject } = Ember;

export default Component.extend(VelocityMixin, AuthenticatedActionsMixin, {
  player: inject.service(),
  tagName: 'section',
  classNames: ['ko-player'],
  shouldShowHeader: true,
  teamOneFullName: computed.readOnly('_matchGroup.teamOne.fullName'),
  teamTwoFullName: computed.readOnly('_matchGroup.teamTwo.fullName'),
  vodUrl: computed.readOnly('_match.vod'),
  matchNumber: computed.readOnly('_match.number'),
  matchGroupStage: computed.readOnly('_matchGroup.stage'),
  tournamentName: computed.readOnly('_tournament.name'),
  isLiked: computed.readOnly('_match.isLiked'),
  isWatched: computed.readOnly('_match.isWatched'),

  toggleHeaderIconType: computed('shouldShowHeader', function() {
    if (this.get('shouldShowHeader')) {
      return 'angle-double-down';
    }

    return 'angle-double-up';
  }),

  _matchGroup: computed.readOnly('_match.matchGroup'),
  _match: computed.readOnly('player.match'),
  _tournament: computed.readOnly('_matchGroup.tournament'),
  
  actions: {
    toggleHeader() {
      this.toggleProperty('shouldShowHeader');
    }
  },

  authenticatedActions: {
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
