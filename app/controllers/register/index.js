import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({

  loading: false,
  disableSubmit: true,
  playerAlias: '',

  configButtonState: function () {
    let alias      = this.get('playerAlias');
    let enoughText = !!alias.length;
    let disable    = !enoughText || this.get('loading');
    this.set('disableSubmit', disable);
  }.observes('playerAlias', 'loading'),

  actions: {
    confirm: function () {
      if (this.get('disableSubmit')) {
        return;
      }
      this.set('loading', true);

      //
      // create a player
      //
      // would use ember data here but the server api
      // doesn't really accomodate for this, and fair
      // enough, due to sercurity related stuff.
      //
      let deffered = $.ajax({
        type: "post",
        url: '/players',
        datatype: 'json',
        data: JSON.stringify({
          alias: this.get('playerAlias')
        }),
      });

      deffered.done((data) => {
        console.log(data);
      });
      deffered.fail((error) => {
        console.error(error.responseJSON.message);
      });
      deffered.always(() => {
        this.set('loading', false);
      });
    }
  }

});
