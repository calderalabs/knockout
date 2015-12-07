import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  model: null,
  match: computed.reads('matches.firstObject'),
  vod: computed.reads('match.vod'),
  vodType: computed.reads('vod.type'),

  matches: computed('model.@each.matches', function() {
    return this.get('model').reduce(function(memo, matchGroup) {
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
