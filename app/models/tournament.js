import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash/lodash';

const { Model, hasMany, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  matchGroups: hasMany('match-group'),
  game: attr('string', { defaultValue: 'dota2' }),

  teams: computed('matchGroups.@each.{teamOne,teamTwo}', function() {
    return _.uniq(this.get('matchGroups').reduce(function(memo, matchGroup) {
      return memo.concat(matchGroup.get('teamOne'), matchGroup.get('teamTwo'));
    }, []), function(team) {
      return team.get('name');
    });
  })
});
