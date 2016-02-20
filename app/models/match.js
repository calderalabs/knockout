import DS from 'ember-data';
import _ from 'npm:lodash';
import moment from 'moment';
import Ember from 'ember';

const { Model, belongsTo, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  matchGroup: belongsTo('match-group'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  winner: belongsTo('team'),
  matchNumber: attr('number'),
  isWatched: attr('boolean', { defaultValue: false }),
  startAt: computed.readOnly('matchGroup.startAt'),

  startDay: computed('startAt', function() {
    return moment(this.get('startAt')).startOf('day').toDate();
  }),

  vod: computed('matchGroup.vods.[]', function() {
    return this.get('matchGroup.vods').objectAt(this.get('matchNumber'));
  }),

  likes: attr('number', { defaultValue: function() {
    return _.random(0, 1000);
  } })
});
