import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | market-updates/ws-data', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{market-updates/ws-data}}`);

    let trimmedText = this.element.textContent.trim();
    assert.ok(trimmedText.includes('Please wait connecting...'));
    assert.ok(trimmedText.includes('USD  0.00000000'));
    assert.ok(trimmedText.includes('USD  0.00000000 (VWAP)'));

    // drop down present
    assert.dom('[data-test-target="drop-dwon"]').exists();
  });
});
