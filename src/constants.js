/*eslint-disable */

const partConstants = {
  id: 'id',
  branch: 'branch',
  base: 'base',
  suffix: 'suffix'
};

const partIndexes = {
  [partConstants.id]: 0,
  [partConstants.branch]: 1,
  [partConstants.base]: 2,
  [partConstants.suffix]: 3
};

const partMaxLengths = {
  [partConstants.id]: 2,
  [partConstants.branch]: 4,
  [partConstants.base]: 8,
  [partConstants.suffix]: 4
};

const bankData = [
  {
    key: 'AB',
    branches: {

      '01': [
        [1, 999],
        [1100, 1199],
        [1800, 1899]
      ],

      '02': [
        [1, 999],
        [1200, 1299]
      ],

      '03': [
        [1, 999],
        [1300, 1399],
        [1500, 1599],
        [1700, 1799],
        [1900, 1999],
        [7350,7399]
      ],

      '04': [
        [2020,2024]
      ],

      '06': [
        [1, 999],
        [1400, 1499]
      ],

      '11': [
        [5000, 6499],
        [6600, 8999]
      ],

      '12': [
        [3000, 3299],
        [3400, 3499],
        [3600, 3699]
      ],

      '13': [
        [4900, 4999]
      ],

      '14': [
        [4700, 4799]
      ],        

      '15': [
        [3900, 3999]
      ],

      '16': [
        [4400, 4499]
      ],

      '17': [
        [3300, 3399]
      ],

      '18': [
        [3500, 3599]
      ],

      '19': [
        [4600, 4649]
      ],

      '20': [
        [4100, 4199]
      ],

      '21': [
        [4800, 4899]
      ],

      '22': [
        [4000, 4049]
      ],

      '23': [
        [3700, 3799]
      ],

      '24': [
        [4300, 4349]
      ],

      '27': [
        [3800, 3849]
      ],

      '30': [
        [2900, 2949]
      ],

      '35': [
        [2400, 2499]
      ],

      '38': [
        [9000, 9499]
      ]
    }
  },

  {
    key: 'D',
    branches: {
      '08': [
        [6500, 6599]
      ]
    }
  },

  {
    key: 'E',
    branches: {
      '09': [
        [0, 0]
      ]
    }
  },

  {
    key: 'F',
    branches: {
      '25': [
        [2500, 2599]
      ],

      '33': [
        [6700, 6799]
      ]
    }
  },

  {
    key: 'G',
    branches: {
      '26': [
        [2600, 2699]
      ],

      '28': [
        [2100, 2149]
      ],

      '29': [
        [2150, 2299]
      ]
    }
  },

  {
    key: 'X',
    branches: {
      '31': [
        [2800, 2849]
      ]
    }
  }

];  

const bankChecksums = {
  A: {
    weighting: [0,0,  6,3,7,9,  0,0,10,5,8,4,2,1,  0,0,0,0],
    modulo: 11
  },

  B: {
    weighting: [0,0,  0,0,0,0,  0,0,10,5,8,4,2,1,  0,0,0,0],
    modulo: 11
  },

  C: {
    weighting: [3, 7,  0,0,0,0,  9,1,10,5,3,4,2,1,  0,0,0,0],
    modulo: 11
  },

  D: {
    weighting: [0, 0,  0,0,0,0,  0,7,6,5,4,3,2,1,  0,0,0,0],
    modulo: 11
  },

  E: {
    weighting: [0, 0,  0,0,0,0,  0,0,0,0,5,4,3,2,  0,0,0,1],
    modulo: 11,
    specialCase: true
  },

  F: {
    weighting: [0, 0,  0,0,0,0,  0,1,7,3,1,7,3,1,  0,0,0,0],
    modulo: 10
  },

  G: {
    weighting: [0, 0,  0,0,0,0,  0,1,3,7,1,3,7,1,  0,3,7,1],
    modulo: 10,
    specialCase: true
  },

  X: {
    weighting: [0, 0,  0,0,0,0,  0,0,0,0,0,0,0,0,  0,0,0,0],
    modulo: 1
  },
};

/*eslint-enable */

export default {
  partConstants,
  partIndexes,
  partMaxLengths,
  bankData,
  bankChecksums
};
