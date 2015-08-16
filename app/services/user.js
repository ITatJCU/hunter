import Ember from 'ember';


/**
 * abstraction over user funcitonality
 *
 */
export default Ember.Service.extend({

  __userLookUpKey: 'user_id',
  ajax: Ember.inject.service('ajax'),

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
        this.get('ajax').get(`/players/${userId}`).then(data => {
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
    return this.get('ajax')
      .post('/player', { alias: name })
      .then(data => data._id);
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
