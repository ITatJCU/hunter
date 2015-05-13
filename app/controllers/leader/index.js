import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['score'],

  //
  // read as highest to lowest
  //
  sortAscending: false
});
