import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { pauseTest } from '@ember/test-helpers';

module('Integration | Component | market-updates/ws-data-row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{market-updates/ws-data-row}}`);

    let trimmedText = this.element.textContent.trim();
    assert.ok(trimmedText.includes('USD  0.00000000'));
    assert.ok(trimmedText.includes('USD  0.00000000 (VWAP)'));

    const data = {
      "amount":0.01,
      "exchange":"bitfinex",
      "high":10623,
      "last":10567,
      "low":10405.01,
      "open":10446.52,
      "pair":"btcusd",
      "route":"Smart",
      "source":"ticker-info",
      "timestamp":"2020-09-13T06:19:12.279Z",
      "volume":2564.1248253,
      "vwap":10500.384969577062
    }

    this.set('payload', data);

    // Template block usage:
    await render(hbs`
      {{#market-updates/ws-data-row payload=payload}}
      {{/market-updates/ws-data-row}}

    `);

    trimmedText = this.element.textContent.trim()
    assert.ok(trimmedText.includes('USD  0.01000000'));
    assert.ok(trimmedText.includes('USD  10500.38496958 (VWAP)'));

    // await pauseTest();

  });
});
