import DS from 'ember-data';
import _ from 'npm:lodash';
import moment from 'moment';
import Ember from 'ember';

const { Model, belongsTo, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team'),
  number: attr('number'),
  isWatched: false,
  startAt: computed.readOnly('matchGroup.startAt'),

  startDay: computed('startAt', function() {
    return moment(this.get('startAt')).startOf('day').toDate();
  }),

  vod: computed('matchGroup.vods.[]', function() {
    return this.get('matchGroup.vods').objectAt(this.get('number'));
  }),

  likes: attr('number', { defaultValue() {
    return _.random(0, 1000);
  } })
});
