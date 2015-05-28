import Ember from 'ember';

export function prettyDate(params/*, hash*/) {
  let date = new Date(params[0]);
  return date.toDateString();
}

export default Ember.HTMLBars.makeBoundHelper(prettyDate);
