import Ember from 'ember';

export default Ember.Route.extend({

  ajax: Ember.inject.service('ajax'),

  model ({ code }) {
    return this.get('ajax')
      .get(`/codes/${code}`)
      .then(c => Ember.Object.create(c.code));
  }
});
