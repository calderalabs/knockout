export default function() {
  this.get('/tournaments/:id', function(db, request) {
    const { id } = request.params;

    return {
      tournament: db.tournaments.find(id),
      teams: db.teams,
      players: db.players,
      series: db.series
    };
  });

  this.get('/tournaments', ['tournaments', 'teams', 'players', 'series']);
}
