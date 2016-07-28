import Ember from 'ember';
import _ from 'npm:lodash';

const { Mixin, inject } = Ember;

export default Mixin.create({
  session: inject.service(),

  didDefineProperty(proto, key, value) {
    if (key === 'authenticatedActions') {
      _.forOwn(value, function(fn, name) {
        proto.actions = proto.actions || {};

        proto.actions[name] = function() {
          const session = this.get('session');
          const event = arguments[arguments.length - 1];

          if (session.get('hasCurrentUser')) {
            return fn.apply(this, arguments);
          }

          event.preventDefault();
          event.stopPropagation();

          return session.authenticate('authenticator:application');
        };
      });
    }
  }
});
