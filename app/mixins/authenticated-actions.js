import Ember from 'ember';
import _ from 'npm:lodash';

const { Mixin, inject } = Ember;

export default Mixin.create({
  session: inject.service(),

  didDefineProperty(proto, key, value) {
    if (key === 'authenticatedActions') {
      _.forOwn(value, function(fn, name) {
        proto.actions = proto.actions || {};

        proto.actions[name] = function(...args) {
          const session = this.get('session');
          const event = args[args.length - 1];

          if (session.get('hasCurrentUser')) {
            return fn(...args);
          }

          event.preventDefault();
          event.stopPropagation();

          return session.authenticate('authenticator:application');
        };
      });
    }
  }
});
