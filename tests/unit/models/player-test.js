import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('player', {
  // Specify the other units that are required for this test.
  needs: ['model:scan']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
