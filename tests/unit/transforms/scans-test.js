import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:scans', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  needs: ['mixin:prop-checker'],
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var transform = this.subject();
  assert.ok(transform);
});

test('it deserialises', function(assert) {
  let transform = this.subject();
  let jsObject = [{
    code: Math.random(),
    event: Math.random(),
    scannedAt: new Date(),
  }];
  let emObject = transform.deserialize(jsObject);

  assert.equal(jsObject[0].code, emObject.get('0.code'));
  assert.equal(jsObject[0].event, emObject.get('0.event'));
  assert.equal(jsObject[0].scannedAt, emObject.get('0.scannedAt'));
});

