import {describe, expectTypeOf, it} from 'vitest';
import {type z} from 'zod';
import {isFemale, isMale, isValidPersonId} from '../src';

const femaleValue: string = '131052-308T';
const maleValue: string = '131052-309U';
const personId: string = '131052-308T';

describe('Test is type branding', () => {
	it('isValidPersonId', () => {
		if (isValidPersonId<z.BRAND<'PersonID'>>(personId)) {
			expectTypeOf(personId).toEqualTypeOf<string & z.BRAND<'PersonID'>>();
		} else {
			expectTypeOf(personId).toEqualTypeOf<string>();
		}
	});
	it('isMale', () => {
		if (isMale<z.BRAND<'MalePersonID'>>(maleValue)) {
			expectTypeOf(maleValue).toEqualTypeOf<string & z.BRAND<'MalePersonID'>>();
		} else {
			expectTypeOf(maleValue).toEqualTypeOf<string>();
		}
	});
	it('isFemale', () => {
		if (isFemale<z.BRAND<'FemalePersonID'>>(femaleValue)) {
			expectTypeOf(femaleValue).toEqualTypeOf<string & z.BRAND<'FemalePersonID'>>();
		} else {
			expectTypeOf(femaleValue).toEqualTypeOf<string>();
		}
	});
});
