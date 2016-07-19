import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

const { Model, belongsTo, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  bestOf: attr('number'),
  startedAt: attr('date'),
  stage: attr('string'),
  tournament: belongsTo('tournament'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  matches: hasMany('match'),
  spoilers: hasMany('spoiler'),

  startDay: computed('startedAt', function() {
    return moment(this.get('startedAt')).startOf('day').toDate();
  }),

  teamOneScore: computed('matches.@each.winner', 'teamOne', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamOne.id')).length;
  }),

  teamTwoScore: computed('matches.@each.winner', 'teamTwo', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamTwo.id')).length;
  }),

  isNew: computed('matches.@each.isNew', function() {
    return this.get('matches').isAny('isNew');
  })
});
