import Ember from 'ember';

export default Ember.Route.extend({

  user: Ember.inject.service('user'),

  model: function () {
    return this.get('user').find().then(user =>  Ember.RSVP.hash({
      player: user,
      scans: Ember.RSVP.all(user.get('scans')
        .map(code => this.store.find('code', code.code)))
    })).then(model => Ember.Object.create(model));
  }
});
