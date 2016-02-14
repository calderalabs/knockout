import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament'],
  tournament: null,
  filter: null,
  sortBy: null,
  name: computed.readOnly('tournament.name'),
  id: computed.readOnly('tournament.id'),

  sortingOptions: [{
    label: 'Recent',
    id: 'recent'
  }, {
    label: 'Popular',
    id: 'popular'
  }],

  sortingOption: computed('sortingOptions', 'sortBy', function() {
    return this.get('sortingOptions').findBy('id', this.get('sortBy'));
  }),

  timeline: computed(function() {
    return [{
      title: moment().calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
      }),
      groupedMatches: [{
        matchGroup: this.get('tournament.matchGroups.firstObject'),
        matches: this.get('tournament.matchGroups.firstObject.matches')
          .toArray().concat(this.get('tournament.matchGroups.firstObject.matches').toArray())
          .toArray().concat(this.get('tournament.matchGroups.firstObject.matches').toArray())
      }]
    }];
  }),

  actions: {
    selectSortingOption(option) {
      this.set('sortBy', option.id);
    }
  }
});
