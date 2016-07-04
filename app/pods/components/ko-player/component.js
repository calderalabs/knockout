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
      if (shouldActivate) {
        return this.get('store').createRecord('watching', {
          match: this.get('_match')
        }).save();
      }

      const following = this.get('_tournament.followings.firstObject');

      if (following) {
        this.incrementProperty('session.currentUser.newMatchesCount');
        following.incrementProperty('newMatchesCount');
      }

      return this.get('_match.watchings.firstObject').destroyRecord();
    },

    toggleLike(shouldActivate) {
      const match = this.get('_match');

      if (shouldActivate) {
        match.incrementProperty('likesCount');
        return this.get('store').createRecord('like', { match }).save();
      }

      match.decrementProperty('likesCount');
      return match.get('likes.firstObject').destroyRecord();
    }
  }
});
