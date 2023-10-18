# NZ Bank Account Validator

## Important: latest changes please refer to: RWT and NRWT Certificates / 2020 / Version 1.0 

v0.0.4 - A small, zero dependency Javascript NZ bank account validation library that runs everywhere.

It is based on the [documentation](https://www.ird.govt.nz/-/media/project/ir/home/documents/digital-service-providers/software-providers/payroll-calculations-business-rules-specifications/payroll-calculations-and-business-rules-specification-2024-v1-1.pdf?modified=20230208203603&modified=20230208203603) provided by the Inland Revenue Department.
This library is not however affiliated with or endorsed by the IRD.


## Getting Started

Using npm:

```shell
$ npm i --save nz-bank-account-validator
```

Using yarn:

```shell
$ yarn add nz-bank-account-validator
```

### Installation

In a browser:
_(See examples/browser.html for code example)_

```html
<script type="text/javascript" src="NZ-Bank-Account-Validator.min.js"></script>
<script type="text/javascript">
  var bankAccountValidator = window['NZ-Bank-Account-Validator'];

  bankAccountValidator.validate('01-902-0068389-00');
</script>
```

In Node.js (require):

```js
const bankValidator = require('nz-bank-account-validator/lib/NZ-Bank-Account-Validator');

bankValidator.validate('01-902-0068389-00');
// => true
```

ES6 Modules:

```js
import bankValidator from 'nz-bank-account-validator/lib/NZ-Bank-Account-Validator';

bankValidator.validate('01-902-0068389-00');
// => true
```

## Usage

```js
const bankValidator = require('nz-bank-account-validator/lib/NZ-Bank-Account-Validator');

bankValidator.getId('01-902-0068389-00'); // '01'
bankValidator.getBranch('01-902-0068389-00'); // '02'
bankValidator.getBase('01-902-0068389-00'); // '0068389'
bankValidator.getSuffix('01-902-0068389-00'); // '00'

bankValidator.getPartsObject('01-902-0068389-00'); // { id: '01', branch: '902', base: '0068389', suffix: '00' }

bankValidator.validate('01-902-0068389-00') // true
bankValidator.validate({ id: '01', branch: '902', base: '0068389', suffix: '00' }) // true

bankValidator.validate('01-902-XXXXX-00') // false
bankValidator.validate('01-902--00') // false
bankValidator.validate('01-902-123456-00') // false
```


## Running the tests

To run the tests locally:

```shell
npm i
npm run tests
npm run testCoverage
# check coverage
```

## Authors

* **Josh Hollinshead** - *Initial work* - [wytlytningNZ](https://github.com/wytlytningNZ)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## References

* [IRD - Validating Bank Account Numbers](https://www.ird.govt.nz/-/media/project/ir/home/documents/digital-service-providers/software-providers/payroll-calculations-business-rules-specifications/payroll-calculations-and-business-rules-specification-2024-v1-1.pdf?modified=20230208203603&modified=20230208203603)
