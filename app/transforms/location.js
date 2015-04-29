import DS from 'ember-data';
import Ember from 'ember';


export default DS.Transform.extend({
  deserialize: function(serialized) {
    return Ember.Object.create({
      latitude: serialized.latitude,
      longitude: serialized.longitude
    });
  },

  serialize: function(deserialized) {
    switch (Ember.typeOf(deserialized)) {
      case 'instance':
        return {
          latitude: deserialized.get('latitude'),
          longitude: deserialized.get('longitude')
        };
      case 'string':
        return deserialized;
      default:
        throw new Error(`locationTransformer cannot serialize a ${Ember.typeOf(deserialized)}`);
    }
  }
});
