import Ember from 'ember';

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('transform:location', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var transform = this.subject();
  assert.ok(transform);
});

test('it serialises', function (assert) {
  var transform = this.subject();

  var emObject = Ember.ObjectProxy.create({
    content: { latitude: 0, longitude: 0 }
  });

  var jsObject = transform.serialize(emObject);

  assert.equal(jsObject.latitude, emObject.get('latitude'));
  assert.equal(jsObject.longitude, emObject.get('longitude'));
});

test('it deserialises', function (assert) {
  var transform = this.subject();

  var jsObject = { latitude: 0, longitude: 0 };

  var emObject = transform.deserialize(jsObject);

  assert.equal(emObject.get('latitude'), jsObject.latitude);
  assert.equal(emObject.get('longitude'), jsObject.longitude);
});




