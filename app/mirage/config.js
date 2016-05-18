import _ from 'npm:lodash';
import Ember from 'ember';

const { assign } = Object;
const { isEmpty } = Ember;

function buildRelationships(descriptors, relationships = {}) {
  if (isEmpty(descriptors)) {
    return relationships;
  }

  const [descriptor, ...rest] = descriptors;

  return assign({}, relationships, {
    [descriptor.name]: {
      data: {
        type: descriptor.type,
        id: descriptor.data.id
      }
    }
  }, buildRelationships(rest));
}

function buildResource(type, data, relationships = []) {
  return {
    type,
    id: data.id,
    attributes: data,
    relationships: buildRelationships(relationships)
  };
}

export default function() {
  this.get('/tournaments', function(db) {
    const tournaments = db.tournaments.map(function(tournament) {
      return buildResource('tournaments', tournament);
    });

    const matchGroups = db['match-groups'].map(function(matchGroup) {
      return buildResource('match-groups', matchGroup, [{
        name: 'tournament',
        type: 'tournaments',
        data: db.tournaments.find(matchGroup.tournament_id)
      }, {
        name: 'team-one',
        type: 'teams',
        data: db.teams.find(matchGroup.team_one_id)
      }, {
        name: 'team-two',
        type: 'teams',
        data: db.teams.find(matchGroup.team_two_id)
      }]);
    });

    const matches = db.matches.map(function(match) {
      return buildResource('matches', match, [{
        name: 'match-group',
        type: 'match-groups',
        data: db['match-groups'].find(match.match_group_id)
      }, {
        name: 'winner',
        type: 'teams',
        data: db.teams.find(match.winner_id)
      }]);
    });

    const teams = db.teams.map(function(team) {
      return buildResource('teams', team);
    });

    return {
      data: tournaments,
      included: _.flatten([matchGroups, matches, teams])
    };
  });

  this.get('/tournaments/:id', function(db, request) {
    const tournament = buildResource('tournaments', db.tournaments.find(request.params.id));

    const matchGroups = db['match-groups'].where({ tournament_id: tournament.id }).map(function(matchGroup) {
      return buildResource('match-groups', matchGroup, [{
        name: 'tournament',
        type: 'tournaments',
        data: db.tournaments.find(matchGroup.tournament_id)
      }, {
        name: 'team-one',
        type: 'teams',
        data: db.teams.find(matchGroup.team_one_id)
      }, {
        name: 'team-two',
        type: 'teams',
        data: db.teams.find(matchGroup.team_two_id)
      }]);
    });

    const matches = _.flatten(matchGroups.map(function(matchGroup) {
      return db.matches.where({ match_group_id: matchGroup.id }).map(function(match) {
        return buildResource('matches', match, [{
          name: 'match-group',
          type: 'match-groups',
          data: db['match-groups'].find(match.match_group_id)
        }, {
          name: 'winner',
          type: 'teams',
          data: db.teams.find(match.winner_id)
        }]);
      });
    }));

    const teams = _.flatten(matchGroups.map(function(matchGroup) {
      return db.teams.find([
        matchGroup.attributes.team_one_id,
        matchGroup.attributes.team_two_id
      ]).map(function(team) {
        return buildResource('teams', team);
      });
    }));

    return {
      data: tournament,
      included: _.flatten([matchGroups, matches, teams])
    };
  });
}
