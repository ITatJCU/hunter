import ENV from '../../config/environment';
import Ember from 'ember';


let namespace = ENV.APP.namespace || '';
let staticEvent = ENV.APP.STATIC_EVENT_ID;


export default Ember.Route.extend({
  model: function () {
    return Ember.$.getJSON(`${namespace}/events/${staticEvent}/leaderboard`).then(function (data) {
      return Ember.ArrayProxy.create({
        content: Ember.A(data.players.sort(function (l, r) {
          if (l.numberOfScans > r.numberOfScans) { return -1; }
          else if (l.numberOfScans < r.numberOfScans) { return 1; }
          else {
            if (l.duration < r.duration) { return -1; }
            else if (l.duration > r.duration) { return 1; }
            else { return 0; }
          }
        }))
      });
    });
  }
});
