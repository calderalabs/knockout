import ApplicationSerializer from './application';
import _ from 'npm:lodash';

export default ApplicationSerializer.extend({
  serialize(object, request) {
    let json = ApplicationSerializer.prototype.serialize.apply(this, arguments);

    if (_.isArray(json.data)) {
      json.data.forEach((tournament, index) => {
        this._extendTournament(tournament, object.models[index]);
      });
    } else {
      this._extendTournament(json.data, object);
    }

    return json;
  },

  _extendTournament(json, model) {
    json.attributes['matches-count'] = model.matchGroups.models.reduce(function(sum, matchGroup) {
      return sum + matchGroup.matches.models.length;
    }, 0);

    delete json.relationships['match-groups'].data;

    json.relationships['match-groups'].links = {
      related: `/match_groups?tournament_id=${model.id}`
    };
  }
});
