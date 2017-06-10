import { 
  partConstants,
  partIndexes,
  partMaxLengths,
  bankData, 
  bankChecksums
} from './constants';

import {
  isString,
  isNumbersOnly,
  padLeft,
  inRanges,
  sumChars,
  getPaddedAccountArray
} from './utils';

export default {

  getId(input) {
    return this.getPartsObject(input).id;
  },
  getBranch(input) {
    return this.getPartsObject(input).branch;
  },
  getBase(input) {
    return this.getPartsObject(input).base;
  },
  getSuffix(input) {
    return this.getPartsObject(input).suffix;
  },

  isPartsObject(obj = {}) {
    if (typeof obj !== 'object') return false;
    const inputsKeys = Object.keys(obj);
    const requiredKeys = Object.keys(partConstants);
    const filteredKeys = requiredKeys.filter(k => inputsKeys.includes(k));

    return requiredKeys.length === filteredKeys.length;
  },

  splitString(str = '') {
    const parts = isString(str) ? str.split(/[^0-9]/) : [];
    
    // If the input string had no delimiters, and its length is
    // long enough, manually forge an array.
    if (parts.length === 1) {
      parts[0] = str.slice(0, 2);
      parts[1] = str.slice(2, 5);
      parts[2] = str.slice(5, 12);
      parts[3] = str.slice(12);
    }

    return parts.filter(i => i.length);
  },

  getPartsObject(input) {
    if (this.isPartsObject(input)) {
      return input;
    }

    if (!isString(input)) {
      return {};
    }

    const parts = this.splitString(input);

    return {
      id: parts[partIndexes.id],
      branch: parts[partIndexes.branch],
      base: parts[partIndexes.base],
      suffix: parts[partIndexes.suffix]
    };
  },

  partsObjectValid(obj = {}) {
    const keys = Object.keys(obj);

    if (keys.length !== 4) {
      return false;
    }

    return keys.reduce((isValid, key) => {
      const value = obj[key];
      const onlyNumbers = isNumbersOnly(value);
      const withinMaxLength = isString(value) && (value.length <= partMaxLengths[key]);
      const valueValid = onlyNumbers && withinMaxLength;

      return isValid && valueValid;
    }, true);
  },

  validate(input) {
    const partsObject = this.getPartsObject(input);

    if (!this.partsObjectValid(partsObject)) { 
      return false; 
    }
    
    const { id, branch, base } = partsObject;

    // VALIDATION - STEP 1
    // https://www.ird.govt.nz/resources/d/8/d8e49dce-1bda-4875-8acf-9ebf908c6e17/rwt-nrwt-spec-2014.pdf (PAGE 10)

    const bankData = this.getBankData(id, branch);
    
    if (!bankData) { return false; }
    
    const algorithm = this.getChecksum(bankData, base);

    if (!algorithm) { return false; }

    // VALIDATION - STEP 2
    // https://www.ird.govt.nz/resources/d/8/d8e49dce-1bda-4875-8acf-9ebf908c6e17/rwt-nrwt-spec-2014.pdf (PAGE 11)
     
    const { weighting, modulo, specialCase } = algorithm;
    const earlyExit = !specialCase;

    const result = getPaddedAccountArray(partsObject).reduce((result, num, idx) => {
      const multiplied = num * weighting[idx];

      if (earlyExit || multiplied < 10) {
        return result + multiplied;
      } 

      const summed = sumChars(multiplied);
      const summedTwice = sumChars(summed);
      const final = summed < 10 ? summed : summedTwice;
      
      return result + final;
    }, 0);

    // Final modulo test
    return result % modulo === 0;
  },

  getBankData(id, branch) {
    const paddedId = padLeft(id, partMaxLengths.id);

    return bankData.find(r => {
      const ranges = r.branches[paddedId];

      return ranges && inRanges(branch, ranges);
    });
  },

  getChecksum(bankData, base) {
    let { key } = bankData;

    if (key === 'AB') {
      key = (parseInt(base, 10) < 990000) ? 'A' : 'B';
    }

    return bankChecksums[key];
  }
};
