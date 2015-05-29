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
    let scans = this.get('scans');
    if (typeof scans !== 'undefined') {
      return this.get('scans').length;
    }
    else {
      return 0;
    }
  }.property('scans')

});
