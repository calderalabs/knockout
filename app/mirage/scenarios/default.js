export default function(server) {
  const teams = server.createList('team', 2);
  const players = server.createList('player', 2);
  const matchGroups = server.createList('match-group', 10, {
    'team_one_id': teams[0].id,
    'team_two_id': teams[1].id
  });

  server.createList('tournament', 6, {
    'team_ids': teams.map((team) => team.id),
    'player_ids': players.map((player) => player.id),
    'match_group_ids': matchGroups.map((matchGroup) => matchGroup.id)
  });
}
