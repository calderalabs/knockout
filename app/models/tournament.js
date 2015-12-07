import DS from 'ember-data';
import Ember from 'ember';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  teams: hasMany('team'),
  matchGroups: hasMany('match-group'),
  format: attr('string'),
  game: attr('string'),

  players: computed('teams.@each.players', function() {
    return this.get('teams').reduce(function(memo, team) {
      return memo.concat(team.get('players').toArray());
    }, []);
  })
});
