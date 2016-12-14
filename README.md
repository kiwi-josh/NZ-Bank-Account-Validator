# NZ Bank Account Validator

v0.0.1 - A small, zero dependency Javascript NZ bank account validation library that runs everywhere.

It is based on the [documentation](https://www.ird.govt.nz/resources/d/8/d8e49dce-1bda-4875-8acf-9ebf908c6e17/rwt-nrwt-spec-2014.pdf) provided by the Inland Revenue Department.
This library is not however affiliated with or endorsed by the IRD.


## Getting Started

### Installation

In a browser:

```html
<script src="NZ-Bank-Account-Validator.min.js"></script>
```

Using npm:

```shell
$ npm i -g npm
$ npm i --save nz-bank-account-validator
```

In Node.js:

```js
const bankValidator = require('nz-bank-account-validator');

bankValidator.validate('01-902-0068389-00');
// => true
```

## Usage

```js
const bankValidator = require('nz-bank-account-validator');

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
```

## Authors

* **Josh Hollinshead** - *Initial work* - [wytlytningNZ](https://github.com/wytlytningNZ)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## References

* [IRD - Validating Bank Account Numbers](https://www.ird.govt.nz/resources/d/8/d8e49dce-1bda-4875-8acf-9ebf908c6e17/rwt-nrwt-spec-2014.pdf)
