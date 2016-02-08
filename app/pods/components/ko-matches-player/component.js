import Ember from 'ember';
import _ from 'lodash/lodash';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-matches-player'],
  matchGroups: null,
  activeMatchGroup: computed.reads('matchGroups.firstObject'),
  activeVod: computed.reads('activeMatchGroup.vods.firstObject'),

  activeVodComponent: computed('activeVod.type', function() {
    return `ko-matches-player/${this.get('activeVod.type')}`;
  }),

  isFirstVodActive: computed('_vods.firstObject', 'activeVod', function() {
    return this.get('_vods.firstObject') === this.get('activeVod');
  }),

  isLastVodActive: computed('_vods.lastObject', 'activeVod', function() {
    return this.get('_vods.lastObject') === this.get('activeVod');
  }),

  _vods: computed('matchGroups.@each.vods', function() {
    return _.flatten(this.get('matchGroups').mapBy('activeVod'));
  }),

  _navigate(index) {
    const vods = this.get('vods');
    this.set('activeVod', vods[vods.indexOf(this.get('activeVod')) + index]);
  },

  actions: {
    previous() {
      this._navigate(-1);
    },

    next() {
      this._navigate(1);
    }
  }
});
