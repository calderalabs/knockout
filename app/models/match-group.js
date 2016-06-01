import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';
import SpoilerableMixin from 'knockout/mixins/spoilerable';

const { Model, belongsTo, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend(SpoilerableMixin, {
  bestOf: attr('number'),
  startAt: attr('date'),
  stage: attr('string'),
  tournament: belongsTo('tournament'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  matches: hasMany('match'),

  startDay: computed('startAt', function() {
    return moment(this.get('startAt')).startOf('day').toDate();
  }),

  teamOneScore: computed('matches.@each.winner', 'teamOne', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamOne.id')).length;
  }),

  teamTwoScore: computed('matches.@each.winner', 'teamTwo', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamTwo.id')).length;
  })
});
