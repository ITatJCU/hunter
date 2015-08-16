import Ember from 'ember';

export default Ember.Controller.extend({

  /**
   * @property showList Boolean
   */
  showList: false,

  updateShowList: function () {
    let hasItems = !!this.get('model.codes.length');
    this.set('showList', hasItems);
  }.observes('model.codes.length')

});
