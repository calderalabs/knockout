import Ember from 'ember';
import Base from 'auth0-ember-simple-auth/authenticators/lock';

const { $ } = Ember;

export default Base.extend({
  init() {
    this._super(...arguments);

    const widget = this.get('lock');

    const addTwitch = function(action) {
      const link = $(`
        <div class="a0-zocial a0-twitch" data-strategy="oauth2" title="Twitch">
          <span>${action} with Twitch</span>
        </div>
      `);

      $('.a0-separator, .a0-iconlist').removeClass('a0-hide');
      $('.a0-iconlist').append(link);

      link.on('click', function(e) {
        e.preventDefault();
        widget.emit('signin submit', widget.options, { provider: 'oauth2' });
        widget._signinSocial(e, 'twitch', null, widget.$panel);
      });
    };

    widget.on('signin ready', () => { addTwitch('Login') });
    widget.on('signup ready', () => { addTwitch('Signup') });
  }
});
