import { faker } from 'ember-cli-mirage';
import _ from 'npm:lodash';

const { list } = faker;

export default function(server) {
  server.createList('tournament', 10).forEach(function(tournament) {
    const teams = list.cycle(...server.createList('team', 5));

    _.range(10).map(function(i) {
      return server.create('match-group', {
        tournament: tournament,
        teamOne: teams(i),
        teamTwo: teams(i + 1)
      });
    }).forEach(function(matchGroup) {
      const winner = list.cycle(matchGroup.teamOne, matchGroup.teamTwo);

      _.range(matchGroup.bestOf).map(function(i) {
        return server.create('match', {
          matchGroup,
          number: i + 1,
          winner: winner(i)
        });
      });
    });
  });
}
