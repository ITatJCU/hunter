import { moduleForModel, test } from 'ember-qunit';

moduleForModel('code', 'Unit | Model | code', {
  // Specify the other units that are required for this test.
  needs: ['transform:location', 'mixin:prop-checker'],
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
