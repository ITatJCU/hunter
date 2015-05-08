import DS from 'ember-data';
import Ember from 'ember';


export default DS.Transform.extend({
  deserialize: function(serialized) {
    return Ember.ObjectProxy.create({
      content: serialized
    });
  },

  serialize: function(deserialized) {
    switch (Ember.typeOf(deserialized)) {
      case 'instance':
        return deserialized.content;
      default:
        throw new Error(`locationTransformer cannot serialize a ${Ember.typeOf(deserialized)}`);
    }
  }
});
