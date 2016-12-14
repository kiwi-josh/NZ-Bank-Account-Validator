import { 
  partMaxLengths
} from './constants';

const isString = x => x === x + '';

const isNumbersOnly = x => /^[0-9]+$/.test(x);

const padLeft = (input, length, token = '0') => Array(length - String(input).length + 1).join(token) + input;

const inRange = (start, value, end) => value >= start && value <= end;

const inRanges = (value, ranges = []) => {
  return ranges.reduce((bool, range) => {
    const [ start, end ] = range;

    return bool || inRange(start, value, end);
  }, true);
};

const sumChars = int => {
  return (int + '').split('').reduce((acc, num) => {
    return acc + (num * 1);
  }, 0);
};

const getPaddedAccountArray = (partsObj) => {
  return Object.keys(partsObj).reduce((a, k) => {
    const paddedValue = padLeft(partsObj[k], partMaxLengths[k]);
    const splitValues = paddedValue.split('');

    return a.concat(splitValues);
  }, []);
};

export default {
  isString,
  isNumbersOnly,
  padLeft,
  inRange,
  inRanges,
  sumChars,
  getPaddedAccountArray
};
