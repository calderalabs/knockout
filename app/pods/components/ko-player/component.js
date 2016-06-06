import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';

const { Component, computed, inject } = Ember;

export default Component.extend(VelocityMixin, {
  store: inject.service(),
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
  tournamentName: computed.readOnly('_matchGroup.tournament.name'),
  isWatched: computed.readOnly('_match.isWatched'),
  isLiked: computed.readOnly('_match.isLiked'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  _matchGroup: computed.readOnly('_match.matchGroup'),
  _match: computed.readOnly('player.match'),

  actions: {
    toggleHeader() {
      this.toggleProperty('shouldShowHeader');
    },

    toggleWatch(shouldActivate) {
      if (shouldActivate) {
        return this.get('store').createRecord('watching', {
          match: this.get('_match')
        }).save();
      }

      return this.get('_match.watchings.firstObject').destroyRecord();
    },

    toggleLike(shouldActivate) {
      if (shouldActivate) {
        return this.get('store').createRecord('like', {
          match: this.get('_match')
        }).save();
      }

      return this.get('_match.likes.firstObject').destroyRecord();
    }
  }
});
