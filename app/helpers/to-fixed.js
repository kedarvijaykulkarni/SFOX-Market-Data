import { helper } from '@ember/component/helper';

export function toFixed([val = 0, num]) {

  if (Math.abs(val) < 1.0) {
    let e = parseInt(val.toString().split('e-')[1]);
    if (e) {
        val *= Math.pow(10,e-1);
        val = '0.' + (new Array(e)).join('0') + val.toString().substring(2);
    }
  } else {
    let e = parseInt(val.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        val /= Math.pow(10,e);
        val += (new Array(e+1)).join('0');
    }
  }

  return Number(val).toFixed(num || 1);
}

export default helper(toFixed);
