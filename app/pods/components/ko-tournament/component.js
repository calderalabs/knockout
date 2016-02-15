import Ember from 'ember';
import moment from 'moment';

const { Component, computed } = Ember;
const { keys } = Object;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament'],
  tournament: null,
  filter: null,
  sortBy: null,
  name: computed.readOnly('tournament.name'),
  id: computed.readOnly('tournament.id'),
  _sortedMatches: computed.sort('_filteredMatches', '_matchesSorting'),

  sortingOptions: [{
    label: 'Recent',
    id: 'recent'
  }, {
    label: 'Likes',
    id: 'likes'
  }],

  sortingOption: computed('sortingOptions', 'sortBy', function() {
    return this.get('sortingOptions').findBy('id', this.get('sortBy'));
  }),

  timeline: computed('_sortedMatches', function() {
    const timeline = [];
    let lastDayDate;
    let lastMatchGroup
    let currentDay;
    let currentCollection;

    this.get('_sortedMatches').forEach(function(match) {
      const matchGroup = match.get('matchGroup');
      const dayDate = moment(matchGroup.get('startAt')).startOf('day').toDate();

      if (!lastDayDate || dayDate.getTime() !== lastDayDate.getTime()) {
        lastDayDate = dayDate;

        currentDay = {
          title: moment(dayDate).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[Next] dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD MMMM YYYY'
          }),

          collections: []
        };

        timeline.pushObject(currentDay);
      }

      if (matchGroup !== lastMatchGroup) {
        lastMatchGroup = matchGroup;

        currentCollection = {
          matchGroup: matchGroup,
          matches: []
        }

        currentDay.collections.pushObject(currentCollection);
      }

      currentCollection.matches.pushObject(match);
    });

    return timeline;
  }),

  _matchesSorting: computed('sortBy', function() {
    const sortBy = this.get('sortBy');

    if (sortBy === 'recent') {
      return ['id:desc'];
    } else if (sortBy === 'likes') {
      return ['likes:desc'];
    }

    return [];
  }),

  _filteredMatches: computed('tournament.matches', 'filter', function() {
    const filter = this.get('filter');
    const matches = this.get('tournament.matches');

    if (filter === 'new') {
      return [];
    } else if (filter === 'unwatched') {
      return matches.rejectBy('isWatched');
    } else if (filter === 'saved') {
      return [];
    }

    return matches;
  }),

  actions: {
    selectSortingOption(option) {
      this.set('sortBy', option.id);
    }
  }
});
