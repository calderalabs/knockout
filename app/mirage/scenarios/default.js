import { faker } from 'ember-cli-mirage';
import _ from 'npm:lodash';

const { list } = faker;

export default function(server) {
  server.createList('tournament', 10).forEach(function(tournament) {
    const teams = list.cycle(...server.createList('team', 5));

    _.range(10).map(function(i) {
      return server.create('match-group', {
        tournamentId: tournament.id,
        teamOneId: teams(i).id,
        teamTwoId: teams(i + 1).id
      });
    }).forEach(function(matchGroup) {
      const winnerId = list.cycle(matchGroup.teamOneId, matchGroup.teamTwoId);

      _.range(matchGroup['best-of']).map(function(i) {
        return server.create('match', {
          matchGroupId: matchGroup.id,
          winnerId: winnerId(i)
        });
      });
    });
  });
}
