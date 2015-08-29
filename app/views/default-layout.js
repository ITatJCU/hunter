import Ember from 'ember';

export default Ember.View.extend({

  pageTitle: 'Untitled',

  _pageTitle: function () {
    return this.get('controller.pageTitle')
        || this.get('pageTitle')
        || 'Untitled';
  }.property('overloadedTitle', 'defaultPageTitle'),

  templateName: 'default-layout',

  scrollFadeThreshold: 25,

  setupScrollWatcher: function () {
    var scrollCallback = this.fadeOutTitleBar.bind(this);
    var sidebarCallback = this.showSideBar.bind(this);

    //
    // call once for consistency
    //
    scrollCallback();

    this.set('__scrollEvent', scrollCallback);
    this.set('__sidebarEvent', sidebarCallback);

    this.$(window).on('scroll', scrollCallback);
    this.$('.nav-burger').on('click', sidebarCallback);
  }.on('didInsertElement'),


  tearDownScrollWatcher: function () {
    this.$(window).off('scroll', this.get('__scrollEvent'));
    this.$('.nav-burger').off('click', this.get('__sidebarEvent'));
  }.on('willDestroyElement'),


  //
  // EVENTS
  //
  //   callbacked are saved as private members so they can be
  //   removed properly and don't hang around after the view
  //   has been detached
  //

  __scrollEvent: null,
  __sidebarEvent: null,

  fadeOutTitleBar: function () {
    var fadeSelector = '.nav-bar';
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
  },

  showSideBar: function () {
    var self = this;
    this.$('.nav-sidebar').removeClass('hidden');
    this.$('.viewport').addClass('defocus');
    Ember.run.later(() => {
      var callback = function callback() {
        //
        // capture in the ember event loop
        //
        Ember.run(() => {
          self.$('.nav-sidebar').addClass('hidden');
          self.$('.viewport').removeClass('defocus');
          //
          // TODO destory these on willDestroyElement
          //
          self.$('.viewport').off('click', callback);
          self.$('.dismiss').off('click', callback);
        });
      };
      this.$('.viewport').on('click', callback);
      this.$('.dismiss').on('click', callback);
    }, 500);
  },

});
