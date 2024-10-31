import {describe, expect, it} from 'vitest';
import {getCheckSum, isFemale, isMale, isValidPersonId, parseStringToInt, validateString} from '../src/';
import {type z} from 'zod';

const femaleValue = '131052-308T';
const maleValue = '131052-309U';

const personId = '131052-308T';

if (isValidPersonId<z.BRAND<'PersonID'>>(personId)) {
	// personId is type as: string & z.BRAND<'PersonID'>
	if (isMale<z.BRAND<'MalePersonID'>>(personId)) {
		// personId is type as: string & z.BRAND<'PersonID'> & z.BRAND<'MalePersonID'>
	}
	if (isFemale<z.BRAND<'FemalePersonID'>>(personId)) {
		// personId is type as: string & z.BRAND<'PersonID'> & z.BRAND<'FemalePersonID'>
	}
}

describe('test hetu', () => {
	describe('test isValidPersonId', () => {
		it('should validate hetu', () => {
			// test branded type guard
			if (isValidPersonId<z.BRAND<'PersonID'>>(femaleValue)) {
				const _test: string & z.BRAND<'PersonID'> = femaleValue;
			}
			expect(isValidPersonId('131052A308T')).to.be.eq(true);
			expect(isValidPersonId('131052-3082')).to.be.eq(false);
		});
		it('should fail if too long or short hetu', () => {
			expect(isValidPersonId('131052-308TA')).to.be.eq(false);
			expect(isValidPersonId('131052-308')).to.be.eq(false);
			expect(isValidPersonId('$$$$$$$$$$$')).to.be.eq(false);
		});
	});
	describe('test gender checks', () => {
		it('should check gender from hetu', () => {
			expect(isMale(femaleValue)).to.be.eq(false);
			expect(isFemale(femaleValue)).to.be.eq(true);
			expect(isMale(maleValue)).to.be.eq(true);
			expect(isFemale(maleValue)).to.be.eq(false);
			expect(isMale.bind(null, '')).to.throw('not valid person id');
			expect(isFemale.bind(null, '')).to.throw('not valid person id');
		});
	});
	describe('test support functions', () => {
		it('parseStringToInt', () => {
			expect(() => parseStringToInt(undefined), 'check undefined').to.throw('Value is undefined');
			expect(() => parseStringToInt('undefined'), 'check NaN').to.throw('Value is not a number');
			expect(parseStringToInt('100')).to.be.eq(100);
		});
		it('validateString', () => {
			expect(() => validateString(undefined), 'check error').to.throw('undefined not a string');
			expect(validateString('hello')).to.be.eq('hello');
		});
		it('getCheckSum', () => {
			expect(() => getCheckSum(100), 'not on checksum index').to.throw('Index out of bounds');
			expect(() => getCheckSum(-1), 'not on checksum index').to.throw('Index out of bounds');
			expect(getCheckSum(0)).to.be.eq('0');
		});
	});
});
