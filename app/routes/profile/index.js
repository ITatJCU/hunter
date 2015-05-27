import Ember from 'ember';

export default Ember.Route.extend({

  user: Ember.inject.service('user'),

  model: function () {
    return this.get('user').find();
  }
});
