export default function(server) {
  const teams = server.createList('team', 2);
  server.createList('tournament', 3, { 'team_ids': teams.map((team) => team.id) });
}
