import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  weight: DS.attr('number'),
  createdAt: DS.attr('date'),
  location: DS.attr('location'),
});
