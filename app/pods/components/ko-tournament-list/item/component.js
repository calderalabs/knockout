import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  session: inject.service(),
  tagName: 'li',
  classNameBindings: [':ko-tournament-list-item', '_isFollowed:ko-tournament-list-item--followed'],
  tournament: null,
  shouldShowNewBadge: false,
  linkViewType: 'timeline',
  newMatchesCount: computed.readOnly('tournament.followings.firstObject.newMatchesCount'),
  name: computed.readOnly('tournament.name'),
  stage: computed.readOnly('tournament.stage'),
  gameName: computed.readOnly('tournament.gameName'),
  id: computed.readOnly('tournament.id'),
  matchesCount: computed.readOnly('tournament.matches.length'),
  isFollowed: computed.readOnly('tournament.isFollowed'),
  hasCurrentUser: computed.readOnly('session.hasCurrentUser'),
  hasNewMatches: computed.gt('newMatchesCount', 0),
  
  actions: {
    toggleFollow(shouldActivate, event) {
      event.stopPropagation();
      event.preventDefault();

      if (shouldActivate) {
        return this.get('store').createRecord('following', {
          tournament: this.get('tournament')
        }).save();
      }

      return this.get('tournament.followings.firstObject').destroyRecord();
    }
  }
});
