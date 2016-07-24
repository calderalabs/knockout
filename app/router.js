import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('main', { path: '' }, function() {
    this.modal('ko-player', { withParams: 'match' });
    this.route('tournament', { path: 'tournaments/:id', resetNamespace: true });
    this.route('tournaments', {resetNamespace: true });
    this.route('following', { resetNamespace: true });
  });

  this.route('index', { path: '/' });
});

export default Router;
