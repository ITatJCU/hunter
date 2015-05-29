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
  find: function () {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let lookupKey = this.get('__userLookUpKey');
      let userId    = localStorage.getItem(lookupKey);
      if (userId !== null) {
        //
        // TODO replace with ember data
        //
        Ember.$.getJSON(`/api/players/${userId}`).then(function (data) {
          resolve(Ember.Object.create(data.player));
        }, function (error) {
          reject(error);
        });
      }
      else {
        reject(new Error('user doesn\'t exist dingus'));
      }
    });
  },

  /**
   * Finds the id of the current user
   * @return {Promise}
   */
  getId: function () {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let lookupKey = this.get('__userLookUpKey');
      let userId    = localStorage.getItem(lookupKey);
      if (userId !== null) {
        resolve(userId);
      }
      else {
        reject(new Error('user doesn\'t exist dingus'));
      }
    });
  },


  /**
   * Determines if a user exists
   * @return {Promise}
   */
  exists: function () {
    return new Ember.RSVP.Promise((resolve) => {
      let lookupKey = this.get('__userLookUpKey');
      let userId    = localStorage.getItem(lookupKey);
      resolve(userId !== null);
    }, 'UserService: \'userExists\'');
  },

  /**
   * This person never existed...
   * @return {Promise}
   */
  forget: function () {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let lookupKey = this.get('__userLookUpKey');
      let userId    = localStorage.getItem(lookupKey);
      if (userId !== null) {
        localStorage.removeItem(lookupKey);
        resolve(null);
      }
      else {
        reject(new Error("you cannot forget the forgotten"));
      }
    });
  },

  /**
   * creates a user
   * @return {Promise}
   */
  create: function (name) {
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
  setId: function (id) {
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
