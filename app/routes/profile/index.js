import Ember from 'ember';


const { RSVP } = Ember;


export default Ember.Route.extend({

  user: Ember.inject.service('user'),
  ajax: Ember.inject.service('ajax'),

  model () {
    let { user, ajax } = this.getProperties('user', 'ajax');
    return user.find()
      .then(player => RSVP.hash({
        player: player,
        codes: RSVP
          .all(player.get('scans').map(scan => ajax.get(`/codes/${scan.code}`)))
          .then(codes => codes.map(code => Ember.Object.create(code.code))) }))
      .then(model => Ember.Object.create(model));
  }
});
