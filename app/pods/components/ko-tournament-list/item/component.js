import Ember from 'ember';
import AuthenticatedActionsMixin from 'knockout/mixins/authenticated-actions';

const { Component, computed } = Ember;

export default Component.extend(AuthenticatedActionsMixin, {
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
  matchesCount: computed.readOnly('tournament.matchesCount'),
  isFollowed: computed.readOnly('tournament.isFollowed'),
  hasNewMatches: computed.gt('newMatchesCount', 0),

  authenticatedActions: {
    toggleFollow(shouldActivate, event) {
      const tournament = this.get('tournament');
      event.stopPropagation();
      event.preventDefault();

      if (shouldActivate) {
        return tournament.get('follow').call(tournament);
      }

      return tournament.get('unfollow').call(tournament);
    }
  }
});
