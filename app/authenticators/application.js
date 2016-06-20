import Base from 'auth0-ember-simple-auth/authenticators/lock';

export default Base.extend({
  init() {
    this._super(...arguments);

    const widget = this.get('lock');

    widget.on('signin ready', function() {
      var link = $('<div class="a0-icon a0-image-icon a0-zocial a0-twitch"><span>Twitch</span></div>');
      $('.a0-separator, .a0-iconlist').removeClass('a0-hide');
      $('.a0-iconlist').append(link);

      link.on('click', function(e) {
        e.preventDefault();
        widget.emit('signin submit', widget.options, { provider: 'oauth2' });
        widget._signinSocial(e, 'twitch', null, widget.$panel);
      });
    });
  }
});