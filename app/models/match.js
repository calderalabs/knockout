import DS from 'ember-data';
import moment from 'moment';
import Ember from 'ember';

const { Model, belongsTo, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  number: attr('number'),
  likes: attr('number'),
  isWatched: false,
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team'),
  startAt: computed.readOnly('matchGroup.startAt'),

  startDay: computed('startAt', function() {
    return moment(this.get('startAt')).startOf('day').toDate();
  }),

  vod: computed('matchGroup.vods.[]', function() {
    return this.get('matchGroup.vods').objectAt(this.get('number') - 1);
  })
});
