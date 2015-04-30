import Ember from 'ember';

export default Ember.View.extend({

  scrollFadeThreshold: 25,


  setupScrollWatcher: function () {
    this.$(window).on('scroll', this.onWindowScroll());
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
      this.set('__scrollEvent', (evt) => {
        var fadeThreshold = this.get('scrollFadeThreshold');

        if (window.scrollY <= fadeThreshold) {
          var opacity = (fadeThreshold - window.scrollY) / fadeThreshold;
          this.$('.page-name')
            .css('opacity', opacity)
            .offset({ bottom: window.scrollY/2 });
        }
        else {
          this.$('.page-name').css('opacity', 0);
        }
      });
      return this.get('__scrollEvent');
    }
  }

});
