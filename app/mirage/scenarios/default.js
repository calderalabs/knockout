import { faker } from 'ember-cli-mirage';

const { random } = faker;

export default function(server) {
  const teams = server.createList('team', 2);

  teams.forEach(function(team) {
    server.createList('player', 2, { 'team_id': team.id });
  });

  const tournaments = server.createList('tournament', 6, {
    'team_ids': teams.mapBy('id')
  });

  tournaments.forEach(function(tournament) {
    const matchGroups = server.createList('match-group', 5, {
      'team_one_id': teams[0].id,
      'team_two_id': teams[1].id,
      'tournament_id': tournament.id
    });

    matchGroups.forEach(function(matchGroup) {
      const matches = server.createList('match', random.number({ min: 1, max: matchGroup.bestOf }), {
        'match_group_id': matchGroup.id,
        'winner_id': () => random.arrayElement(teams).id,
        'team_one_id': teams[0].id,
        'team_two_id': teams[1].id
      });

      matches.forEach(function(match) {
        server.create('vod', { 'match_id': match.id });
      });
    });
  });
}
