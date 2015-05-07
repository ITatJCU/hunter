import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      players: this.store.find('player')
    }).then((object) => {
      return Ember.Object.create(object);
    });
  }
});
