import Ember from 'ember';

export default Ember.Route.extend({

  userService: Ember.inject.service('user'),

  beforeModel: function (transition) {
    let userService = this.get('userService');
    let {event, code} = transition.params['scan.new'];

    return userService.findCurrentUserId().then(userId => {
      return Ember.$.ajax({
        url: `/scan/${event}/${code}`,
        method: 'get',
        headers: {
          player: userId
        }
      });
    })
    .then(result => {
      //
      // when the code is a valid scan
      //
      console.log(result);
      this.transitionTo('leader');
    }, error => {
      //
      // when the code is an invalid scan
      //
      let errorResponse = JSON.parse(error.responseText);
      console.error(`Hunter-Server: ${errorResponse.message}`);
      this.transitionTo('scan.notFound', event, code);
    });
  }

});
