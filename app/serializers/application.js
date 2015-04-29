import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: function (type) {
    return '_id';
  },

  serializeId: function(id) {
    console.log(id);
    return id.toString();
  }
});
