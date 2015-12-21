import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  matchGroups: null,
  vod: computed.reads('matchGroupsWithVods.firstObject.vods.firstObject'),
  vodType: computed.reads('vod.type'),

  matchGroupsWithVods: computed('matchGroups', function() {
    return this.get('matchGroups').filter(function(matchGroup) {
      return matchGroup.get('vods.length') && matchGroup.get('vods').filter(function(vod) {
        return vod.type === 'youtube';
      }).length > 0;
    });
  }),

  matches: computed('matchGroups.@each.matches', function() {
    return this.get('matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('matches').toArray());
    }, []);
  }),

  vodComponent: computed('vodType', function() {
    return `ko-matches-player/${this.get('vodType')}`;
  }),

  isFirstMatch: computed('matches.firstObject', 'match', function() {
    return this.get('matches.firstObject') === this.get('match');
  }),

  isLastMatch: computed('matches.lastObject', 'match', function() {
    return this.get('matches.lastObject') === this.get('match');
  }),

  actions: {
    previous() {
      if (!this.get('isFirstMatch')) {
        const matches = this.get('matches');
        this.set('match', matches[matches.indexOf(this.get('match')) - 1]);
      }
    },

    next() {
      if (!this.get('isLastMatch')) {
        const matches = this.get('matches');
        this.set('match', matches[matches.indexOf(this.get('match')) + 1]);
      }
    }
  }
});
