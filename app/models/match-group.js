import DS from 'ember-data';
import Ember from 'ember';

const { Model, belongsTo, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  tournament: belongsTo('tournament'),
  teamOne: belongsTo('team'),
  teamTwo: belongsTo('team'),
  matches: hasMany('matches'),
  bestOf: attr('number'),
  elimination: attr('boolean'),

  teamOneScore: computed('matches.@each.winner', function() {
    return this.get('matches').filterBy('winner', this.get('teamOne')).length;
  }),

  teamTwoScore: computed('matches.@each.winner', function() {
    return this.get('matches').filterBy('winner', this.get('teamTwo')).length;
  })
});
