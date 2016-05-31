import Ember from 'ember';
import _ from 'npm:lodash';
import moment from 'moment';

const { Component, computed, get, inject, observer, on } = Ember;

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
  _matches: computed.readOnly('tournament.matches'),

  arrangedMatches: computed('_unwatchedMatches', '_matches', 'viewType', function() {
    if (this.get('viewType') === 'popular') {
      return _.orderBy(
        this.get('_matches'),
        [_.partialRight(get, 'likeCount'), _.partialRight(get, 'startAt')],
        ['desc', 'desc']
      );
    }

    return _.orderBy(this.get('_unwatchedMatches'), [_.partialRight(get, 'startAt')], ['desc']);
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

  _unwatchedMatches: computed('_matches', function() {
    return this.get('_matches').rejectBy('isWatched');
  }),

  _arrangedMatchesDidChange: observer('arrangedMatches', on('init', function() {
    this.get('player').set('playlist', this.get('arrangedMatches'));
  }))
});
