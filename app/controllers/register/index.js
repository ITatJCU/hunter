import Ember from 'ember';


export default Ember.Controller.extend({

  user: Ember.inject.service('user'),

  loading: false,
  disableSubmit: true,
  playerAlias: '',
  previousTransition: null,

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
      //
      // disables any input
      //
      this.set('loading', true);

      let user = this.get('user');
      let alias = this.get('playerAlias');

      //
      // create a player
      //
      user.create(alias).then((id) => {
        return user.setId(id);
      }, (error) => {
        //
        // handle different errors
        //
        console.error(error.responseJSON.message);
        this.set('message', 'Username is taken :(');
        this.set('loading', false);
        return error;
      }).then(() => {
        //
        // go back to previous page
        //
        let previousTransition = this.get('previousTransition');

        if (previousTransition) {
          //
          // prevent GC loitering
          //
          this.set('previousTransition', null);
          previousTransition.retry();
        } else {
          //
          // Default back to homepage
          //
          this.transitionToRoute('leader');
        }
      });
    }
  }

});
