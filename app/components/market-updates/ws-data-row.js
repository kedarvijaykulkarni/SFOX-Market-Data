import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['flex'],
  highLow: computed('payload.{high,last}', function() {
    return this.payload ? (this.payload.last - this.payload.open) / this.payload.open : 0; 
  }),

  highLowCss: computed('highLow', function() {
    return this.payload ? this.highLow > 0 ? 'text-green' : 'text-red' : 'text-gray';
  })
});
