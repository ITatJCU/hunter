import Ember from 'ember';

export function incNumber(params/*, hash*/) {
  return params[0]+1;
}

export default Ember.HTMLBars.makeBoundHelper(incNumber);
