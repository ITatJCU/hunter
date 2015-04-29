import ListItemView from 'ember-list-view/list-item-view';
import ListView from 'ember-list-view';
import Ember from 'ember';

export default ListView.extend({
  height: 800,
  rowHeight: 40,
  itemViewClass: ListItemView.extend({
    templateName: 'leader/list-item'
  }),
});
