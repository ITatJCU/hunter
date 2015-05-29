import DS from 'ember-data';

let config = {
  namespace: 'api'
};

console.log(ENV);

if (typeof ENV.host !== 'undefined') {
  config.host = ENV.host;
}

export default DS.RESTAdapter.extend(config);
