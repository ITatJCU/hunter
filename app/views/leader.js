import Ember from 'ember';

export default Ember.View.extend({

  scrollFadeThreshold: 25,


  setupScrollWatcher: function () {
    var callback = this.onWindowScroll();
    callback();
    this.$(window).on('scroll', callback);
  }.on('didInsertElement'),


  tearDownScrollWatcher: function () {
    this.$(window).off('scroll', this.onWindowScroll());
  }.on('willDestroyElement'),


  //
  // EVENTS
  //

  __scrollEvent: null,

  onWindowScroll: function () {
    var cb = this.get('__scrollEvent');

    if (cb) {
      return cb;
    }
    else {
      var fadeSelector = '.nav-bar';
      this.set('__scrollEvent', () => {
        var fadeThreshold = this.get('scrollFadeThreshold');

        if (window.scrollY <= fadeThreshold) {
          var opacity = (fadeThreshold - window.scrollY) / fadeThreshold;
          this.$(fadeSelector)
            .css({
              opacity: opacity,
              display: 'initial'
            })
            .offset({ bottom: window.scrollY/2 });
        }
        else {
          this.$(fadeSelector).css({
            opacity: 0,
            display: 'none'
          });
        }
      });
      return this.get('__scrollEvent');
    }
  }

});
