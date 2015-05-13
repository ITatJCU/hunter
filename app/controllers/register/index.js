import Ember from 'ember';


export default Ember.Controller.extend({

  userService: Ember.inject.service('user'),

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
      //
      // disables any input
      //
      this.set('loading', true);

      let userService = this.get('userService');
      let playerAlias = this.get('playerAlias');

      //
      // create a player
      //
      userService.createUser(playerAlias).then((id) => {
        return userService.setCurrentUser(id);
      }, (error) => {
        //
        // TODO show error message
        //
        console.error(error.responseJSON.message);
        this.set('message', 'Username is taken :(');
        this.set('loading', false);
        return error;
      }).then(() => {
        //
        // go back to previous page
        //
        var previousTransition = this.get('previousTransition');
        if (previousTransition) {
          this.set('previousTransition', null);
          previousTransition.retry();
        } else {
          //
          // Default back to homepage
          //
          this.transitionToRoute('index');
        }
      });
    }
  }

});
