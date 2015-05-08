import Ember from 'ember';

export default Ember.Controller.extend({

  loading: false,
  disableSubmit: true,
  playerAlias: '',

  configButtonState: function () {
    let alias =  this.get('playerAlias');
    let enoughText = !!alias.length;
    let disable = !enoughText || this.get('loading');
    this.set('disableSubmit', disable);
  }.observes('playerAlias', 'loading'),

  actions: {
    confirm: function () {
      if (this.get('disableSubmit')) {
        return;
      }
      this.set('loading', true);
      let alias = this.get('playerAlias');
      //
      // TODO create account here
      //
    }
  }

});
