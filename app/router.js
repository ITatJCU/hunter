import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('leader', function () {
  });
  this.resource('register', function () {
  });
  this.resource('profile', function() {
  });

  this.route('scan', function() {
    this.route('new', { path: '/:event/:code' });
    this.route('notFound', { path: '/notFound/:event/:code' });
  });

  this.route('loading');
});
