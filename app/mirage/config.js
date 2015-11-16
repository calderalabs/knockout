export default function() {
  this.get('/tournaments/:id', function(db, request) {
    const { id } = request.params;

    return {
      tournament: db.tournaments.find(id),
      teams: db.teams,
      players: db.players,
      matchGroups: db['match-groups']
    };
  });

  this.get('/tournaments', function(db) {
    return {
      tournaments: db.tournaments,
      teams: db.teams,
      players: db.players,
      matchGroups: db['match-groups']
    };
  });
}
