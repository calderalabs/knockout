export default function(server) {
  const teams = server.createList('team', 2);
  const players = server.createList('player', 2);

  server.createList('tournament', 3, {
    'team_ids': teams.map((team) => team.id),
    'player_ids': players.map((player) => player.id)
  });
}
