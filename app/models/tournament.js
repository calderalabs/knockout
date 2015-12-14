import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash/lodash';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  matchGroups: hasMany('match-group'),
  format: attr('string'),
  game: attr('string', { defaultValue: 'dota2' }),

  players: computed('teams.@each.players', function() {
    return this.get('teams').reduce(function(memo, team) {
      return memo.concat(team.get('players').toArray());
    }, []);
  }),

  teams: computed('matchGroups.@each.{teamOne,teamTwo}', function() {
    return _.uniq(this.get('matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('teamOne'), matchGroup.get('teamTwo'));
    }, []), function(team) {
      return team.get('name');
    });
  })
});
