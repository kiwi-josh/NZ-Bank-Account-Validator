import chai from 'chai';
import Library from '../lib/NZ-Bank-Account-Validator.js';

chai.expect();

const expect = chai.expect;

const getPartTests = [
	['Get id', 'getId', ['01-902-0068389-083'], '01'],
	['Get branch', 'getBranch', ['01-902-0068389-083'], '902'],
	['Get base', 'getBase', ['01-902-0068389-083'], '0068389'],
	['Get suffix', 'getSuffix', ['01-902-0068389-083'], '083'],
];

const isPartsObjectTests = [
	['Valid', 'isPartsObject', [{ id: '01', branch: '902', base: '0068389', suffix: '083' }], true],
	['Extra property', 'isPartsObject', [{ extra: 'property', id: '01', branch: '902', base: '0068389', suffix: '083' }], true],
	['Missing id HERE', 'isPartsObject', [{ branch: '902', base: '0068389', suffix: '083' }], false],
	['Misspelt branch', 'isPartsObject', [{ id: '01', brannch: '902', base: '0068389', suffix: '083' }], false]
];

const splitStringTests = [
	['Standard', 'splitString', ['01-902-0068389-00'], ['01', '902', '0068389', '00']],
	['Mixed delimiters', 'splitString', ['01-902_0068389$00'], ['01', '902', '0068389', '00']],
	['No delimiters', 'splitString', ['01902006838900'], ['01', '902', '0068389', '00']],
	['Short input', 'splitString', ['01-902'], ['01', '902']],
	['No delimiters', 'splitString', ['019'], ['01', '9']],
];

const getPartsObjectTests = [
	['Complete', 'getPartsObject', ['01-902-0068389-083'], { id: '01', branch: '902', base: '0068389', suffix: '083' }],
	['No suffix or base', 'getPartsObject', ['01-902-0068389'], { id: '01', branch: '902', base: '0068389', suffix: undefined }],
	['No Suffix', 'getPartsObject', ['01-902'], { id: '01', branch: '902', base: undefined, suffix: undefined }],
	['No Suffix or base or branch', 'getPartsObject', ['01'], { id: '01', branch: undefined, base: undefined, suffix: undefined }],
	['Inappropriate base value', 'getPartsObject', ['01-902-00f8389-083'], { id: '01', branch: '902', base: '00', suffix: '8389' }],
];

const partsObjectValidTests = [
	['Valid', 'partsObjectValid', [{ id: '12', branch: '123', base: '12345678', suffix: '1234' }], true],

	['Id to long', 'partsObjectValid', [{ id: '123', branch: '123', base: '12345678', suffix: '1234' }], false],
	['Branch to long', 'partsObjectValid', [{ id: '12', branch: '12345', base: '12345678', suffix: '1234' }], false],
	['Base to long', 'partsObjectValid', [{ id: '12', branch: '1234', base: '123456789', suffix: '1234' }], false],
	['Suffix to long', 'partsObjectValid', [{ id: '12', branch: '1234', base: '12345678', suffix: '12345' }], false],

	['No Id', 'partsObjectValid', [{ branch: '1234', base: '12345678', suffix: '12345' }], false],
	['No Branch', 'partsObjectValid', [{ id: '12', base: '12345678', suffix: '12345' }], false],
	['No Base', 'partsObjectValid', [{ id: '12', branch: '1234', suffix: '12345' }], false],
	['No Suffix', 'partsObjectValid', [{ id: '12', branch: '1234', base: '12345678' }], false],

	['Null Id', 'partsObjectValid', [{ id: null, branch: '123', base: '12345678', suffix: '1234' }], false],
	['Undefined Branch', 'partsObjectValid', [{ id: '12', branch: undefined, base: '12345678', suffix: '1234' }], false],
	['Base with alphabetical character', 'partsObjectValid', [{ id: '12', branch: '1234', base: 'abc4567', suffix: '1234' }], false],
	['Empty object', 'partsObjectValid', [{}], false],
	['String', 'partsObjectValid', ['this is a test string'], false],
];

const validateTests = [
	// Success tests
	['Algorithm A test', 'validate', ['01-902-0068389-00'], true],
	['Algorithm A test as object', 'validate', [{ id: '01', branch: '902', base: '0068389', suffix: '083' }], true],
	['Algorithm A test (No delimiters)', 'validate', ['01902006838900'], true],
	['Algorithm D test', 'validate', ['08-6523-1954512-001'], true],
	['Algorithm G test', 'validate', ['26-2600-0320871-032'], true],
	['Random test 1', 'validate', ['12-3140-0171323-50'], true],
	['Random test 2', 'validate', ['12-3141-325080-00'], true],
	

	// Failure tests
	['String missing branch, base and suffix', 'validate', ['02','01'], false],
	['String missing base and suffix', 'validate', ['01-902'], false],
	['String missing suffix', 'validate', ['01-902-0068389'], false],

	['Object missing id', 'validate', [{ branch: '902', base: '0068389', suffix: '083' }], false],
	['Object missing branch', 'validate', [{ id: '01', base: '0068389', suffix: '083' }], false],
	['Object missing base', 'validate', [{ id: '01', branch: '902', suffix: '083' }], false],
	['Object missing suffix', 'validate', [{ id: '01', branch: '902', base: '0068389' }], false],

	['Number instead of string or object', 'validate', [12345678], false],
];

const groupedTests = [
	['Get Part tests', getPartTests],
	['Is Parts Object tests', isPartsObjectTests],
	['Split String tests', splitStringTests],
	['Get Parts Object tests', getPartsObjectTests],
	['Parts Object Valid tests', partsObjectValidTests],
	['Validate tests', validateTests]
];

groupedTests.forEach(([groupLabel, tests]) => {

	describe(groupLabel, function () {

		tests.forEach(([label, fn, inputs, outcome]) => {
			it(`${label}. Expect function '${fn}' with inputs ${JSON.stringify(inputs)} to equal ${JSON.stringify(outcome)}`, () => {
				expect(Library[fn](...inputs)).to.be.deep.equal(outcome);		
			});
		});

	});

});
