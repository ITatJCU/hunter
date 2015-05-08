import DS from 'ember-data';

export default DS.Model.extend({
  alias: DS.attr('string'),
  createdAt: DS.attr('date'),
  scans: DS.attr('scans'),

  /**
   * A computed property for a players score
   * @member {number}
   */
  score: function () {
    return this.get('scans').length;
  }.property('scans')

});
