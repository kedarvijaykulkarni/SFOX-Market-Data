import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  /*
   * 1. Inject the websockets service
   */
  websockets: service(),
  socketRef: null,
  model: null,
  message: "Please wait connecting...",
  dropdownDisabled: true,
  selectedItem: "btcusd",
  lastSelectedItem: computed(function(){
    return ["ticker.sfox.btcusd"];
  }),

  /*
	* for all data one time show 
  */
  displayingItems: computed(function(){
    return ["all", "btcusd", "ltcusd", "ethbtc", "ltcbtc"];
  }),

  btcusd: computed('model.payload.pair', function() {
    let data = this.model && this.model.payload && this.model.payload.pair === 'btcusd' 
                ? this.model.payload
                : this.btcusdLast;
    // eslint-disable-next-line ember/no-side-effects                
    this.set('btcusdLast', data);
    return data;
  }),

  btcusdLast: null,

  ltcusd: computed('model.payload.pair', function() {
    let data = this.model && this.model.payload && this.model.payload.pair === 'ltcusd' 
                ? this.model.payload
                : this.ltcusdLast;
    // eslint-disable-next-line ember/no-side-effects                
    this.set('ltcusdLast', data);
    return data;
  }),

  ltcusdLast: null,

  ethbtc: computed('model.payload.pair', function() {
    let data = this.model && this.model.payload && this.model.payload.pair === 'ethbtc' 
                ? this.model.payload
                : this.ethbtcLast;
    // eslint-disable-next-line ember/no-side-effects                
    this.set('ethbtcLast', data);
    return data;
  }),

  ethbtcLast: null,

  ltcbtc: computed('model.payload.pair', function() {
    let data = this.model && this.model.payload && this.model.payload.pair === 'ltcbtc' 
                ? this.model.payload
                : this.ltcbtcLast;
    // eslint-disable-next-line ember/no-side-effects
    this.set('ltcbtcLast', data);
    return data;
  }),

  ltcbtcLast: null,

  /****************** all data ******************/

  didInsertElement() {
    this._super(...arguments);

    /*
      2. The next step you need to do is to create your actual websocket. Calling socketFor
      will retrieve a cached websocket if one exists or in this case it
      will create a new one for us.
    */
    const socket = this.websockets.socketFor('wss://ws.sfox.com/ws');

    /*
      3. The next step is to define your event handlers. All event handlers
      are added via the `on` method and take 3 arguments: event name, callback
      function, and the context in which to invoke the callback. All 3 arguments
      are required.
    */
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', this.myCloseHandler, this);

    this.set('socketRef', socket);

  },

  willDestroyElement() {
    this._super(...arguments);

    const socket = this.socketRef;

    /*
      4. The final step is to remove all of the listeners you have setup.
    */
    socket.off('open', this.myOpenHandler);
    socket.off('message', this.myMessageHandler);
    socket.off('close', this.myCloseHandler);
  },

  myOpenHandler(event) {
    // eslint-disable-next-line no-console
    console.log(`On open event has been called: ${event}`);
    this.set('dropdownDisabled', false);
    this.socketRef.send(
      JSON.stringify({
        "type": "subscribe",
        "feeds": ["ticker.sfox.btcusd"]
      })
    );
  },

  myMessageHandler(event) {
    // eslint-disable-next-line no-console
    console.log(`Message: ${event.data}`);
    this.set('model', JSON.parse(event.data));

    let sucessMessage = this.model.type === 'success' 
        ? `Connection ${this.model.type}, please wait data is loading` 
        : this.model.type;

    this.set('message', sucessMessage)
  },

  myCloseHandler(event) {
    this.set('message', this.model ? this.model.type : 'Error in connection')
    // eslint-disable-next-line no-console
    console.log(`On close event has been called: ${event}`);
  },

  actions: {
    updateSocketSend(item) {
      // Update the socket send
      this.set('message', "Please wait connecting...");
      let feeds = item === "all" 
        ? ["ticker.sfox.btcusd", "ticker.sfox.ltcusd", "ticker.sfox.ethbtc", "ticker.sfox.ltcbtc"]
        : [`ticker.sfox.${item}`];

      // unsubscribe last feed first 
      this.socketRef.send(
        JSON.stringify({
          "type": "unsubscribe",
          "feeds": this.lastSelectedItem
        })
      );

      // store this for later unsubscribe
      this.set('lastSelectedItem', feeds);

      // subscribe new feed
      this.socketRef.send(
        JSON.stringify({
          "type": "subscribe",
          "feeds": feeds
        })
      );
    }
  }

});
