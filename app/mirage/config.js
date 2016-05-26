import _ from 'npm:lodash';
import Ember from 'ember';
import ENV from 'knockout/config/environment';
import Mirage, { faker } from 'ember-cli-mirage';

const { assign } = Object;
const { isEmpty } = Ember;
const { Response } = Mirage;

function currentUser(db, request) {
  const authorization = request.requestHeaders['Authorization'];

  if (authorization) {
    return db.users.firstOrCreate({ token: authorization.split(' ')[1] }, {
      name: faker.name.findName()
    });
  }

  return null;
}

function buildRelationships(descriptors, relationships = {}) {
  if (isEmpty(descriptors)) {
    return relationships;
  }

  const [descriptor, ...rest] = descriptors;
  let relationship = {};

  if (descriptor.data) {
    relationship.data = {
      type: descriptor.type,
      id: descriptor.data.id
    };
  }

  if (descriptor.url) {
    relationship.links = { related: descriptor.url };
  }

  return assign(relationships, {
    [descriptor.name]: relationship
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
  this.passthrough(`https://${ENV['auth0-ember-simple-auth'].domain}/**`);

  this.get('/tournaments', function(db) {
    const tournaments = db.tournaments.map(function(tournament) {
      return buildResource('tournaments', tournament);
    });

    const matchGroups = db['match-groups'].map(function(matchGroup) {
      return buildResource('match-groups', matchGroup, [{
        name: 'tournament',
        type: 'tournaments',
        data: db.tournaments.find(matchGroup.tournamentId)
      }, {
        name: 'team-one',
        type: 'teams',
        data: db.teams.find(matchGroup.teamOneId)
      }, {
        name: 'team-two',
        type: 'teams',
        data: db.teams.find(matchGroup.teamTwoId)
      }]);
    });

    const matches = db.matches.map(function(match) {
      return buildResource('matches', match, [{
        name: 'match-group',
        type: 'match-groups',
        data: db['match-groups'].find(match.matchGroupId)
      }, {
        name: 'winner',
        type: 'teams',
        data: db.teams.find(match.winnerId)
      }]);
    });

    const teams = db.teams.map(function(team) {
      return buildResource('teams', team);
    });

    const followings = db.followings.map(function(following) {
      return buildResource('following', following);
    });

    return {
      data: tournaments,
      included: _.flatten([matchGroups, matches, teams, followings])
    };
  });

  this.get('/tournaments/:id', function(db, request) {
    const tournament = buildResource('tournaments', db.tournaments.find(request.params.id));

    const matchGroups = db['match-groups'].where({ tournamentId: tournament.id }).map(function(matchGroup) {
      return buildResource('match-groups', matchGroup, [{
        name: 'tournament',
        type: 'tournaments',
        data: db.tournaments.find(matchGroup.tournamentId)
      }, {
        name: 'team-one',
        type: 'teams',
        data: db.teams.find(matchGroup.teamOneId)
      }, {
        name: 'team-two',
        type: 'teams',
        data: db.teams.find(matchGroup.teamTwoId)
      }]);
    });

    const matches = _.flatten(matchGroups.map(function(matchGroup) {
      return db.matches.where({ matchGroupId: matchGroup.id }).map(function(match) {
        return buildResource('matches', match, [{
          name: 'match-group',
          type: 'match-groups',
          data: db['match-groups'].find(match.matchGroupId)
        }, {
          name: 'winner',
          type: 'teams',
          data: db.teams.find(match.winnerId)
        }]);
      });
    }));

    const teams = _.flatten(matchGroups.map(function(matchGroup) {
      return db.teams.find([
        matchGroup.attributes.teamOneId,
        matchGroup.attributes.teamTwoId
      ]).map(function(team) {
        return buildResource('teams', team);
      });
    }));

    return {
      data: tournament,
      included: _.flatten([matchGroups, matches, teams])
    };
  });

  this.get('/users/:id', function(db, request) {
    return {
      data: buildResource('users', currentUser(db, request))
    };
  });

  this.get('/followings', function(db, request) {
    return {
      data: db.followings.where({ userId: currentUser(db, request).id }).map(function(following) {
        return buildResource('followings', following, [{
          name: 'tournament',
          type: 'tournaments',
          data: db.tournaments.find(following.tournamentId)
        }])
      })
    }
  });

  this.post('/followings', function(db, request) {
    const body = JSON.parse(request.requestBody);
    const userId = currentUser(db, request).id;
    const tournamentId = body.data.relationships.tournament.data.id;
    return { data: buildResource('followings', db.followings.insert({ userId, tournamentId })) };
  });

  this.delete('/followings/:id', function(db, request) {
    db.followings.remove(request.params.id);
    return new Response(204, {}, {});
  });
}
