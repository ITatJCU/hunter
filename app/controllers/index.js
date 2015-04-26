import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['application'],

  count: 0,

  appNameBinding: 'controllers.application.appName',

  actions: {
    incrementCount: function () {
      this.set('count', this.get('count') + 1);
    }
  },
});
