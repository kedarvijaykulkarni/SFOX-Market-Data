import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-fixed', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{to-fixed inputValue}}`);
    assert.equal(this.element.textContent.trim(), '1234.0');

    await render(hbs`{{to-fixed inputValue 2}}`);
    assert.equal(this.element.textContent.trim(), '1234.00');

    await render(hbs`{{to-fixed inputValue 4}}`);
    assert.equal(this.element.textContent.trim(), '1234.0000');

    await render(hbs`{{to-fixed inputValue 8}}`);
    assert.equal(this.element.textContent.trim(), '1234.00000000');

  });
});
