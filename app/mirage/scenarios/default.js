export default function(server) {
  const teams = server.createList('team', 2);
  const players = server.createList('player', 2);
  const series = server.createList('series', 10, {
    'team_one_id': teams[0].id,
    'team_two_id': teams[1].id
  });

  server.createList('tournament', 3, {
    'team_ids': teams.map((team) => team.id),
    'player_ids': players.map((player) => player.id),
    'series_ids': series.map((series) => series.id),
  });
}
