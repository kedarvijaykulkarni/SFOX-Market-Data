import Component from '@ember/component';

export default Component.extend({
	tagName: 'svg',
  attributeBindings: ['xmlns', 'width', 'height', 'viewBox'],
  xmlns: 'http://www.w3.org/2000/svg',
  width: '1rem',
  height: '1rem',
  viewBox: '0 0 181 347'
});
