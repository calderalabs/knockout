import Ember from 'ember';
import _ from 'npm:lodash';
import moment from 'moment';

const { Component, computed, get, inject } = Ember;

export default Component.extend({
  session: inject.service(),
  player: inject.service(),
  tagName: 'section',
  classNames: ['ko-tournament'],
  tournament: null,
  viewType: null,
  name: computed.readOnly('tournament.name'),
  id: computed.readOnly('tournament.id'),
  isFollowed: computed.readOnly('tournament.isFollowed'),
  isShowingTimeline: computed.equal('viewType', 'timeline'),
  isShowingPopular: computed.equal('viewType', 'popular'),
  isShowingNew: computed.equal('viewType', 'new'),
  shouldShowNewNavItem: computed.and('session.hasCurrentUser', 'isFollowed'),
  hasNewMatches: computed.gt('_newMatches.length', 0),
  _newMatches: computed.filterBy('_matches', 'isNew'),
  _matches: computed.readOnly('tournament.matches'),

  arrangedMatches: computed('_filteredMatches', 'viewType', function() {
    const filteredMatches = this.get('_filteredMatches');

    if (this.get('viewType') === 'popular') {
      return _.orderBy(
        filteredMatches,
        [_.partialRight(get, 'likesCount'), _.partialRight(get, 'startedAt')],
        ['desc', 'desc']
      );
    }

    return _.orderBy(filteredMatches, [_.partialRight(get, 'startedAt')], ['desc']);
  }),

  timeline: computed('tournament.matchGroups', function() {
    return _
      .chain(this.get('tournament.matchGroups').toArray())
      .groupBy((m) => m.get('startDay').getTime())
      .reduce(function(memo, matchGroups, startDay) {
        return memo.concat({
          _startDay: startDay,
          matchGroups,

          title: moment(parseInt(startDay, 10)).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[Next] dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD MMMM YYYY'
          })
        });
      }, [])
      .orderBy(['_startDay'], ['desc'])
      .value();
  }),

  _filteredMatches: computed('_matches.@each.isNew', 'viewType', function() {
    const matches = this.get('_matches');

    if (this.get('viewType') === 'popular') {
      return matches;
    }

    return matches.filterBy('isNew');
  }),

  actions: {
    markAllAsWatched() {
      this.get('tournament.followings.firstObject').watchAllMatches();
    }
  }
});
