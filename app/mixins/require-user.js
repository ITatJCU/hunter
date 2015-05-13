import Ember from 'ember';

/**
 * Will transition to the registation route if no
 * user is setup at the moment.
 * @mixin
 */
export default Ember.Mixin.create({

  __RequireUserMixin_userService: Ember.inject.service('user'),

  beforeModel: function () {
    let userService = this.get('__RequireUserMixin_userService');
    return userService.userExists().then((exists) => {
      if (exists) {
        return null;
      }
      else {
        return this.transitionTo('register');
      }
    });
  },

});
