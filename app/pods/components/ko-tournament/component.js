import Ember from 'ember';
import _ from 'npm:lodash';
import moment from 'moment';

const { Component, computed, get, inject } = Ember;

export default Component.extend({
  player: inject.service(),
  tagName: 'section',
  classNames: ['ko-tournament'],
  tournament: null,
  viewType: null,
  name: computed.readOnly('tournament.name'),
  id: computed.readOnly('tournament.id'),
  isShowingTimeline: computed.equal('viewType', 'timeline'),
  isShowingPopular: computed.equal('viewType', 'popular'),

  arrangedMatches: computed('_filteredMatches', 'viewType', function() {
    const filteredMatches = this.get('_filteredMatches');

    if (this.get('viewType') === 'popular') {
      return _.orderBy(
        filteredMatches,
        [_.partialRight(get, 'likes'), _.partialRight(get, 'startAt')],
        ['desc', 'desc']
      );
    }

    return _.orderBy(filteredMatches, [_.partialRight(get, 'startAt')], ['desc']);
  }),

  timeline: computed('_filteredMatches', function() {
    return _
      .chain(this.get('_filteredMatches'))
      .groupBy((m) => m.get('startDay').getTime())
      .reduce(function(memo, matches, startDay) {
        return memo.concat({
          _startDay: startDay,

          title: moment(parseInt(startDay, 10)).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[Next] dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD MMMM YYYY'
          }),

          collections: _
            .chain(matches)
            .groupBy(_.partialRight(get, 'matchGroup.id'))
            .reduce(function(memo, matches, matchGroupId) {
              return memo.concat({
                _matchGroupId: matchGroupId,
                matchGroup: matches[0].get('matchGroup'),
                matches: matches.sortBy('number')
              });
            }, [])
            .value()
            .sortBy('_matchGroupId')
        });
      }, [])
      .orderBy(['_startDay'], ['desc'])
      .value();
  }),

  _filteredMatches: computed('tournament.matches', 'viewType', function() {
    const matches = this.get('tournament.matches');

    if (this.get('viewType') === 'unwatched') {
      return matches.rejectBy('isWatched');
    }

    return matches;
  }),

  actions: {
    watch(match) {
      this.get('player').startPlaying(match, {
        playlist: this.get('tournament.matches')
      });
    }
  }
});
