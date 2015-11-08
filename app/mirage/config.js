export default function() {
  this.get('/tournaments/:id', function(db, request) {
    var id = request.params.id;

    return {
      tournament: db.tournaments.find(id),
      teams: db.teams
    };
  });

  this.get('/tournaments', ['tournaments', 'teams']);
}
