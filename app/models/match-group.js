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

  teamOneScore: computed('matches.@each.winner', 'teamOne', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamOne.id')).length;
  }),

  teamTwoScore: computed('matches.@each.winner', 'teamTwo', function() {
    return this.get('matches').filterBy('winner.id', this.get('teamTwo.id')).length;
  }),

  vods: DS.attr(),

  hasVods: computed('vods.[]', function() {
    return this.get('vods').filter(function(vod) {
      return vod.type === 'youtube';
    }).length > 0;
  })
});
