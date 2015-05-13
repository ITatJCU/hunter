import Ember from 'ember';
import PropCheckerMixin from '../../../mixins/prop-checker';
import { module, test } from 'qunit';

module('PropCheckerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PropCheckerObject = Ember.Object.extend(PropCheckerMixin);
  var subject = PropCheckerObject.create();
  assert.ok(subject);
});
