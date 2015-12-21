import Ember from 'ember';
import _ from 'lodash/lodash';

const { computed } = Ember;

export default Ember.Component.extend({
  matchGroups: null,
  matchGroup: computed.reads('matchGroupsWithVods.firstObject'),
  vod: computed.reads('vods.firstObject'),
  vodType: computed.reads('vod.type'),

  matchGroupsWithVods: computed('matchGroups', function() {
    return this.get('matchGroups').filter(function(matchGroup) {
      return matchGroup.get('hasVods');
    });
  }),

  vods: computed('matchGroupsWithVods', function() {
    return _.flatten(this.get('matchGroupsWithVods').map(function(matchGroup) {
      return matchGroup.get('vods');
    }));
  }),

  vodComponent: computed('vodType', function() {
    return `ko-matches-player/${this.get('vodType')}`;
  }),

  isFirstVod: computed('vods.firstObject', 'vod', function() {
    return this.get('vods.firstObject') === this.get('vod');
  }),

  isLastVod: computed('vods.lastObject', 'vod', function() {
    return this.get('vods.lastObject') === this.get('vod');
  }),

  actions: {
    previous() {
      if (!this.get('isFirstVod')) {
        const vods = this.get('vods');
        this.set('vod', vods[vods.indexOf(this.get('vod')) - 1]);
      }
    },

    next() {
      if (!this.get('isLastVod')) {
        const vods = this.get('vods');
        this.set('vod', vods[vods.indexOf(this.get('vod')) + 1]);
      }
    }
  }
});
