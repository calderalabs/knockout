import { faker } from 'ember-cli-mirage';

const { random } = faker;

export default function(server) {
  const teams = server.createList('team', 2);

  const tournaments = server.createList('tournament', 15, {
    'team_ids': teams.mapBy('id')
  });

  tournaments.forEach(function(tournament) {
    const matchGroups = server.createList('match-group', 5, {
      'team_one_id': teams[0].id,
      'team_two_id': teams[1].id,
      'tournament_id': tournament.id
    });

    matchGroups.forEach(function(matchGroup) {
      server.createList('match', random.number({ min: 1, max: matchGroup.bestOf }), {
        'match_group_id': matchGroup.id,
        'winner_id': () => random.arrayElement(teams).id,
        'team_one_id': teams[0].id,
        'team_two_id': teams[1].id
      });
    });
  });
}
