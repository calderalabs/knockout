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
  matchGroups: computed.sort('_filteredMatchGroups', '_matchGroupsSorting'),
  _filteredMatchGroups: computed.filterBy('tournament.matchGroups', 'isWatched', null),

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
    return [];
  }),

  _matchGroupsSorting: computed('sortBy', function() {
    const sortBy = this.get('sortBy');

    if (sortBy === 'recent') {
      return ['id:desc'];
    } else if (sortBy === 'popular') {
      return ['likes:desc'];
    }
  }),

  actions: {
    selectSortingOption(option) {
      this.set('sortBy', option.id);
    }
  }
});
