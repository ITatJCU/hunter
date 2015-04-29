import DS from 'ember-data';

export default DS.Model.extend({
  alias: DS.attr('string'),
  createdAt: DS.attr('date'),
  scans: DS.hasMany('scan')
});
