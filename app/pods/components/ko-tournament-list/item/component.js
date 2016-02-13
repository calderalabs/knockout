import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['ko-tournament-list-item'],
  tournament: null,
  unwatchedVods: computed.filterBy('_vods', 'isWatched', false),

  _vods: computed('matchGroups.@each.vods.[]', function() {
    return this.get('tournament.matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('vods').toArray());
    }, []);
  })
});
