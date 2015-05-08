import Ember from 'ember';

export default Ember.Controller.extend({

  playerAlias: '',

  actions: {
    //
    // TODO wire up properly
    //
    confirm: function () {
      let alias = this.get('playerAlias');
      console.log(`ayy lmao you name is ${alias}`);
    }
  }

});
