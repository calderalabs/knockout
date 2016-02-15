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

  timeline: computed(
    '_sortedMatches.@each.matchGroup.startAt',
    'tournament.matchGroups.@each.id', function() {
    const matchGroups = this.get('tournament.matchGroups');

    const matchesByDay = _.groupBy(this.get('_sortedMatches'), function(match) {
      return moment(match.get('matchGroup.startAt')).startOf('day').toDate();
    });

    return keys(matchesByDay).map(function(day) {
      const matchesByGroupId = _.groupBy(matchesByDay[day], function(match) {
        return match.get('matchGroup.id');
      });

      return {
        title: moment(day).calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: '[Next] dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD MMMM YYYY'
        }),

        collections: keys(matchesByGroupId).map(function(id) {
          return {
            matchGroup: matchGroups.findBy('id', id),
            matches: matchesByGroupId[id]
          };
        })
      };
    });
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
