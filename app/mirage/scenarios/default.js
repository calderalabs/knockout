import { faker } from 'ember-cli-mirage';
import _ from 'npm:lodash';

const { list } = faker;

export default function(server) {
  server.createList('tournament', 10).forEach(function(tournament) {
    const teams = list.cycle(...server.createList('team', 5));

    _.range(10).map(function(i) {
      return server.create('match-group', {
        tournament_id: tournament.id,
        team_one_id: teams(i).id,
        team_two_id: teams(i + 1).id
      });
    }).forEach(function(matchGroup) {
      const winnerId = list.cycle(matchGroup.team_one_id, matchGroup.team_two_id);

      _.range(matchGroup['best-of']).map(function(i) {
        return server.create('match', {
          match_group_id: matchGroup.id,
          winner_id: winnerId(i)
        });
      })
    });
  });
}
