/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/first */
process.env.NODE_ENV = 'test';
import 'mocha';
import {isFemale, isMale, isValidPersonId} from '../src/';
import {expect} from 'chai';

describe('test hetu', () => {
	it('should validate hetu', () => {
		expect(isValidPersonId('131052-308T')).to.be.eq(true);
		expect(isValidPersonId('131052A308T')).to.be.eq(true);
		expect(isValidPersonId('131052-3082')).to.be.eq(false);
	});
	it('should fail if too long or short hetu', () => {
		expect(isValidPersonId('131052-308TA')).to.be.eq(false);
		expect(isValidPersonId('131052-308')).to.be.eq(false);
	});
	it('should check gender from hetu', () => {
		expect(isMale('131052-308T')).to.be.eq(false);
		expect(isFemale('131052-308T')).to.be.eq(true);
		expect(isMale.bind(null, '')).to.throw('not valid person id');
		expect(isFemale.bind(null, '')).to.throw('not valid person id');
	});
});
