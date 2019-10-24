process.env.NODE_ENV = 'test';
import {expect} from 'chai';
import 'mocha';
import {isFemale, isMale, isValidPersonId} from '../src/';

describe('test hetu', () => {
	it('should validate hetu', () => {
		expect(isValidPersonId('131052-308T')).to.be.eq(true);
		expect(isValidPersonId('131052-3082')).to.be.eq(false);
	});
	it('should fail if too long or short hetu', () => {
		expect(isValidPersonId('131052-308TA')).to.be.eq(false);
		expect(isValidPersonId('131052-308')).to.be.eq(false);
	});
	it('should check gender from hetu', () => {
		expect(isMale('131052-308T')).to.be.eq(false);
		expect(isFemale('131052-308T')).to.be.eq(true);
	});
});
