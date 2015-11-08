export default function() {
  this.get('/tournaments/:id', function(db, request) {
    const id = request.params.id;

    return {
      tournament: db.tournaments.find(id),
      teams: db.teams
    };
  });

  this.get('/tournaments', ['tournaments', 'teams']);
}
