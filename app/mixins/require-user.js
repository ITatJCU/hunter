import Ember from 'ember';

/**
 * A mixin for routes that will transition to the
 * registation route if no user is setup at the moment.
 * @mixin RequireUser
 */
export default Ember.Mixin.create({

  __RequireUserMixin_user: Ember.inject.service('user'),

  beforeModel: function (transition) {
    let user = this.get('__RequireUserMixin_user');
    return user.exists().then((exists) => {
      if (exists) {
        return null;
      }
      else {
        let registation = this.controllerFor('register/index');
        registation.set('previousTransition', transition);
        return this.transitionTo('register');
      }
    });
  },

});
