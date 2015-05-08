import Ember from 'ember';


export default Ember.Service.extend({

  __userLookUpKey: 'user_id',

  /**
   * Finds the current user
   * @return {Promise}
   */
  findCurrentUser: function () {
    return Ember.RSVP.resolve(null);
  },

  /**
   * Determines if a user exists
   * @return {Promise}
   */
  userExists: function () {
    return new Ember.RSVP.Promise((resolve) => {
      let lookupKey = this.get('__userLookUpKey');
      let userId    = localStorage.getItem(lookupKey);
      console.log(userId);
      resolve(userId !== null);
    }, 'UserService: \'userExists\'');
  },

  forgetUser: function () {
    return new Ember.RSVP.Promise((resolve) => {
      let lookupKey = this.get('__userLookUpKey');
      localStorage.removeItem(lookupKey);
      resolve(null);
    });
  }

});
