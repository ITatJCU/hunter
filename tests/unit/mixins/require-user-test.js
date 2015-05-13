import Ember from 'ember';
import RequireUserMixin from '../../../mixins/require-user';
import { module, test } from 'qunit';

module('RequireUserMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RequireUserObject = Ember.Object.extend(RequireUserMixin);
  var subject = RequireUserObject.create();
  assert.ok(subject);
});
