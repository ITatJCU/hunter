import Ember from 'ember';

export default Ember.Controller.extend({
  count: 0,

  actions: {
    incrementCount: function () {
      this.set('count', this.get('count') + 1);
    }
  },
});
