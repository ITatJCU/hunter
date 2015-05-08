import PropChecker from '../mixins/prop-checker';
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend(PropChecker, {

  propCheckerCheckProps: ['code', 'event', 'scannedAt'],

  deserialize: function(serialized) {
    this.verifyPropsMany(serialized);
    return serialized.map((scan) => {
      return Ember.ObjectProxy.create({ content: scan });
    });
  },

  serialize: function(deserialized) {
    switch (Ember.typeOf(deserialized)) {
      case 'instance':
        let result = deserialized.mapBy('content');
        this.verifyPropsMany(result);
        return result;
      default:
        throw new Error(`scansTransformer cannot serialize a ${Ember.typeOf(deserialized)}`);
    }
  }
});
