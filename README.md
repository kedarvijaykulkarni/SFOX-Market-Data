# SFOX: Market Data Challege

The goal of this exercise is to use our public marketdata websocket to create a simple price ticker.

## User Stories
- As a user, I should by default see the price of `btcusd`
- As a user, I should be able to switch between displaying prices forthe following pairs: `ltcusd`, `ethbtc`, `ltcbtc`, `btcusd` 
- As a user, I should see the price of the currency pair live update without refreshing the page

## Technical Requirements

**Websocket Endpoint**: 

`wss://ws.sfox.com/ws` 

**Subscribing Payload**
```js
{ 'type': 'subscribe', feeds: ['ticker.sfox.btcusd'] }
```

**Unsubscribing Payload**
```js
{ 'type': 'unsubscribe', feeds: ['ticker.sfox.btcusd'] }
```

**Data shape**
The websocket message data will be the shape of a `IMarketTickRecord`

```ts
export interface IMarketTickRecord {
  amount: number;
  exchange: string;
  last: number;
  high: number;
  low: number;
  open: string;
  pair: string;
  route: string;
  source: string;
  timestamp: string;
  volume: number;
  vwap: number;
}
```

**Allowed Frameworks**
We are looking for knowledge of good component patterns, so this project DOES need to use one of the following frameworks: 
- Ember/Glimmer
- React: Hooks only (or any of the equivalents like preact, inferno, etc.)
- Vue
- Svelte

Any other non-SPA framework libraries are allowed. Only use libraries that you absolutely need.

## UI/Design

We aren't looking for any particular design, however the following needs to be clear:
- What pair the prices are currently showing for
- What cryptocurrency the price refers to as the "base currency" (what you are buying or selling)
- What the price is (use vwap)

Here is an example of a price ticker:

https://blocksdecoded.com/wp-content/uploads/2019/10/crypto-price-widget-desktop-cryptocurrency-price-tracker.jpg

Here is the developer documentation:

https://www.sfox.com/developers/

## Prerequisites

### Clone the repository

SSH ` git clone git@github.com:kedarvijaykulkarni/SFOX-Market-Data.git`

HTTPS `https://github.com/kedarvijaykulkarni/SFOX-Market-Data.git`

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Code Bbase
`
  app
    component
      market-updates
        ws-data-row.js
        ws-data.js
      miscellaneous
        usd-symbol.js
    helpers
      to-fixed.js
    styles
      app.scss
      tachyons.scss
    templates
      components
        market-updates
          ws-data-row.hbs
          ws-data.hbs
        miscellaneous
          usd-symbol.hbs
      application.hbs
`
## Installation

* `git clone <repository-url>` this repository
* `cd sfox-market-data`
* `npm install`

## Running / Development

* `npm start` or
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
