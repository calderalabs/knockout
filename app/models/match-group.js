import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from 'ember';

const { Model, belongsTo, hasMany, attr } = DS;
const { computed } = Ember;
const { fragmentArray } = MF;

export default Model.extend({
  bestOf: attr('number'),
  startAt: attr('date'),
  stage: attr('string'),
  vods: fragmentArray('vod'),
  tournament: belongsTo('tournament'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  matches: hasMany('match'),

  teamOneScore: computed('matches.@each.winner', 'teamOne', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamOne.id')).length;
  }),

  teamTwoScore: computed('matches.@each.winner', 'teamTwo', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamTwo.id')).length;
  })
});
