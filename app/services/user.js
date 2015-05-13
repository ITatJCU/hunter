import Ember from 'ember';
import $ from 'jquery';


/**
 * abstraction over user funcitonality
 *
 */
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
      resolve(userId !== null);
    }, 'UserService: \'userExists\'');
  },

  forgetUser: function () {
    return new Ember.RSVP.Promise((resolve) => {
      let lookupKey = this.get('__userLookUpKey');
      localStorage.removeItem(lookupKey);
      resolve(null);
    });
  },

  /**
   * creates a user
   * @return {Promise}
   */
  createUser: function (name) {
    //
    // would use ember data here but the server api
    // doesn't really accomodate for this, and fair
    // enough, due to sercurity related stuff.
    //
    return new Ember.RSVP.Promise((resolve, reject) => {
      //
      // jquery deferred isn't a promise, common misconception
      //
      let deffered = $.ajax({
        type: "post",
        url: '/players',
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ alias: name }),
      });
      deffered.done(resolve);
      deffered.fail(reject);
    }).then((data) => {
      return data._id;
    });
  },

  /**
   * sets the current user as the id
   * @return {Promise}
   */
  setCurrentUser: function (id) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let lookupKey = this.get('__userLookUpKey');
      if (typeof id === 'string') {
        localStorage.setItem(lookupKey, id);
        resolve(null);
      }
      else {
        reject(new TypeError('user id must be a string'));
      }
    });
  }

});
