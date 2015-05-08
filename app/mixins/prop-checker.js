import Ember from 'ember';



/**
 * Provides functionality of verifying if an object
 * is missing properties.
 * @mixin
 */
export default Ember.Mixin.create({

  propCheckerCheckProps: [],

  __PropChecker_findsMissing: function (object) {
    let propArray = this.get('propCheckerCheckProps');

    //
    // when bablejs supports symbols change
    // this loop to a `for of`
    //
    for (let propIndex in propArray) {
      if (propArray.hasOwnProperty(propIndex)) {
        let prop = propArray[propIndex];
        if (typeof object[prop] !== 'undefined') {
          return prop;
        }
      }
    }

    return null;
  },

  /**
   * checks if an object is missing an properties
   * @param {object} object - the object being verified
   */
  verifyProps: function (object) {
    let missing = this.__PropChecker_findsMissing(object);
    //
    // null defines that there is no missing properties
    //
    if (missing !== null) {
      let props = this.get('propCheckerCheckProps');
      let repr  = JSON.stringify(object);
      throw new Error(
        `${repr} is missing the prop '${missing}'` +
        ` of the following props '${props}'.`
      );
    }
  },

  /**
   * checks if elements of an array are missing properties
   * @param {array} objects - an array of objects being verified
   */
  verifyPropsMany: function (objects) {
    //
    // using a `for in' loop for performance &
    // to get the key of the array.
    //
    for (let index in objects) {
      //
      // generally this isn't necessary in js code but
      // ember arrays have a key called _super
      //
      if (objects.hasOwnProperty(index)) {
        let object = objects[index];
        let missing = this.__PropChecker_findsMissing(object);
        //
        // null defines that there is no missing properties
        //
        if (missing === null) {
          let props = this.get('propCheckerCheckProps');
          let repr  = JSON.stringify(object);
          throw new Error(
            `${repr} @ index '${index}' of ${objects}` +
            ` is missing the prop '${missing}' of the` +
            ` following props '${props}'.`
          );
        }
      }
    }
  }

});
