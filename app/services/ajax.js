import ENV from '../config/environment';
import Ember from 'ember';


const { $ } = Ember;
const namespace = ENV.APP.namespace || '';


/**
 * handles any api namespace prefixing
 */
export default Ember.Service.extend({

  get (url) {
    const trimmed = this.__trimLeadingSlash(url);
    return $.ajax({
      type: "get",
      url: `${namespace}/${trimmed}`,
      datatype: 'json',
    });
  },

  post (url, data) {
    const trimmed = this.__trimLeadingSlash(url);
    return $.ajax({
      type: "post",
      url: `${namespace}/${trimmed}`,
      datatype: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
    });
  },

  __trimLeadingSlash (url) {
    if (url.indexOf('/') === 0) {
      return url.substr(1);
    }
    else {
      return url;
    }
  }
});
