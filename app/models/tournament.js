import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash/lodash';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  game: attr('string'),
  matchGroups: hasMany('match-group'),

  gameName: computed('game', function() {
    return this.get('game').replace(/-/g, ' ').capitalize();
  }),

  teams: computed('matchGroups.@each.{teamOne,teamTwo}', function() {
    return _.uniq(this.get('matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('teamOne'), matchGroup.get('teamTwo'));
    }, []), function(team) {
      return team.get('name');
    });
  })
});
