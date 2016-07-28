import Ember from 'ember';
import Base from 'auth0-ember-simple-auth/authenticators/lock';

const { $, RSVP } = Ember;

export default Base.extend({
  init() {
    this._super(...arguments);

    const lock = this.get('lock');

    const customize = function(action) {
      $('.a0-separator, .a0-iconlist').removeClass('a0-hide');

      if ($('.a0-twitch').length === 0) {
        const twitchLink = $(`
          <div class="a0-zocial a0-twitch" data-strategy="oauth2" title="Twitch">
            <span>${action} with Twitch</span>
          </div>
        `);

        $('.a0-iconlist').append(twitchLink);

        twitchLink.on('click', function(e) {
          e.preventDefault();
          lock.emit('signin submit', lock.options, { provider: 'oauth2' });
          lock._signinSocial(e, 'twitch', null, lock.$panel);
        });
      }
    };

    lock.on('signin ready', function() {
      customize('Login');
    });

    lock.on('signup ready', function() {
      customize('Signup');
    });
  },

  authenticate(...args) {
    return new RSVP.Promise((resolve, reject) => {
      this.get('lock').once('close', Ember.run.bind(this, reject));

      this._super(...args).then(() => {
        resolve(...arguments);
      });
    });
  }
});
