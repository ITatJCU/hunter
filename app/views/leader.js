import Ember from 'ember';

export default Ember.View.extend({

  scrollFadeThreshold: 25,

  setupScrollWatcher: function () {
    this.$(window).on('scroll', (evt) => {
      var fadeThreshold = this.get('scrollFadeThreshold');

      if (window.scrollY <= fadeThreshold) {
        var opacity = (fadeThreshold - window.scrollY) / fadeThreshold;
        this.$('.page-name').css('opacity', opacity);
      }
      else {
        this.$('.page-name').css('opacity', 0);
      }
    });
  }.on('didInsertElement')

});
