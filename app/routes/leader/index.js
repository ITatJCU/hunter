import ENV from '../../config/environment';
import Ember from 'ember';


let namespace = ENV.APP.namespace || '';
let staticEvent = ENV.APP.STATIC_EVENT_ID;


export default Ember.Route.extend({
  model: function () {
    return $.getJSON(`${namespace}/events/${staticEvent}/leaderboard`).then(function (data) {
      return Ember.ArrayProxy.create({ content: Ember.A(data.players) });
    });
  }
});
